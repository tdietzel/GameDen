import mongoose, { Schema, models } from 'mongoose'

mongoose.models = {}

const userSchema = new Schema(
  {
    screenName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      default: 100,
    },
    level: {
      type: Number,
      default: 1,
    },
    exp: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

const UserModel = models.UserModel || mongoose.model('UserModel', userSchema);
export default UserModel;