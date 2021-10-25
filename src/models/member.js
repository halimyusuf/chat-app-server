import mongoose from 'mongoose';

const memberSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
  },
  { timestamps: true }
);

export default mongoose.model('Member', memberSchema);
