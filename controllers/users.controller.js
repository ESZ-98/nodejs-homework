import Joi from 'joi';
import fs from 'fs/promises';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import config from '../config/config.js';
import Jimp from 'jimp';
import nanoid from 'nanoid';
import { send } from '../services/email.service.js';

import 'dotenv/config';

const schemaUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
  password: Joi.string().min(6).required(),
});

const signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email in use',
      data: 'Conflict',
    });
  } else {
    const validateSignUp = schemaUser.validate(req.body);
    if (validateSignUp.error) {
      return res.status(400).json({
        status: 'bad-request',
        code: 400,
        data: validateSignUp.error,
      });
    }
  }
  try {
    const newUser = new User({ email });
    newUser.generateAvatar();
    newUser.setPassword(password);
    newUser.set('verificationToken', nanoid());
    await newUser.save();
    const verificationToken = newUser.verificationToken;
    send(email, verificationToken);
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email or password is wrong',
        data: 'Unauthorized',
      });
    }

    const validateLogIn = schemaUser.validate(req.body);
    if (validateLogIn.error) {
      return res.status(400).json({
        status: 'bad-request',
        message: 'Invalid data',
        error: validateLogIn.error,
      });
    }

    const payload = {
      id: user._id,
    };

    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    user.token = token;
    await user.save();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: 'starter',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    user.token = null;
    await user.save();

    return res.status(204).json({
      status: 'no-content',
      code: 204,
      message: 'No content',
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  const { _id, email, avatarURL } = req.user;
  try {
    const user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        user: {
          email,
          subscription: 'starter',
          avatarURL: avatarURL,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(config.getAvatarsPath(), fileName);
  await fs.rename(tmpUpload, resultUpload);
  const avatar = await Jimp.read(resultUpload);
  avatar.resize(250, 250);
  avatar.write(resultUpload);
  const avatarURL = path.join('avatars', fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      avatarURL,
    },
  });
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.set('verify', true);
    user.verificationToken = null;
    await user.save();
    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error(error);
  }
};

const reverifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Missing required field email' });
    }
    const user = await User.findOne({ email });
    if (user.verify) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        ResponseBody: {
          message: 'Verification has already been passed',
        },
      });
    }
    const verificationToken = user.verificationToken;
    send(email, verificationToken);
    res.status(200).json({
      status: 'Ok',
      code: 200,
      ResponseBody: {
        message: 'Verification email sent',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateAvatars,
  verifyEmail,
  reverifyEmail,
};
