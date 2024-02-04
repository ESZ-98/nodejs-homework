import Joi from 'joi';
import fs from 'fs/promises';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import config from '../config/config.js';
import Jimp from 'jimp';

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
    await newUser.save();
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
  if (!User) {
    return res.status(401).json({
      status: 'unauthorized',
      code: 401,
      message: 'Not authorized',
      data: 'Unauthorized',
    });
  } else {
    const { path: tmpUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(config.getAvatarsPath, fileName);
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
  }
};

export default { signupUser, loginUser, logoutUser, currentUser, updateAvatars };
