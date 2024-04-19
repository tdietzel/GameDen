import mongoose, { Schema, models } from 'mongoose'

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
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;