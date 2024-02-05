import mongoose from 'mongoose';
const { Schema } = mongoose;
import bCrypt from 'bcryptjs';
import gravatar from 'gravatar';

const user = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

user.methods.generateAvatar = function () {
  this.avatarURL = gravatar.url(this.email);
};

const User = mongoose.model('user', user, 'users');

export { User };
