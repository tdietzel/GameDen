import mongoose from 'mongoose'

mongoose.models = {};

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
    },
  ],
  isPublic: {
    type: Boolean,
    default: true,
  }
});

const GroupModel = mongoose.models.Group || mongoose.model('GroupModel', groupSchema);
export default GroupModel;
