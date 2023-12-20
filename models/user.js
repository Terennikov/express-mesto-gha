import mongoose from 'mongoose';

const userSheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 30,
    },
    about: {
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 30,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  // Options
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('user', userSheme);
