import mongoose from 'mongoose';

const cardSheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'user',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  // Options
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('card', cardSheme);
