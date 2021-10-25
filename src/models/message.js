import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    date: { type: Date, default: Date.now },
    type: { type: String, default: 'text' },
    content: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
