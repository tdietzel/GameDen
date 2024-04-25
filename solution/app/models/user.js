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
      default: 10000,
    },
    level: {
      type: Number,
      default: 1,
    },
    exp: {
      type: Number,
      default: 0,
    },
    expToNextLvl: {
      type: Number,
      default: 100,
    },
    wins: {
      type: Number,
      default: 0,
    },
    loses: {
      type: Number,
      default: 0,
    },
    wl: {
      type: Schema.Types.Decimal128,
      default: 0.0,
    },
    blackjackWins: {
      type: Number,
      default: 0,
    },
    rouletteWins: {
      type: Number,
      default: 0,
    },
    spadesWins: {
      type: Number,
      default: 0,
    },
    unoWins: {
      type: Number,
      default: 0,
    },
    totalGamesPlayed: {
      type: Number,
      default: 0,
    },
    maxCoins: {
      type: Number,
      default: 10000,
    }
  },
  { timestamps: true }
);

const UserModel = models.UserModel || mongoose.model('UserModel', userSchema);
export default UserModel;