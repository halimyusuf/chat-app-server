import mongoose from 'mongoose';

const WorkspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // users: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Workspace', WorkspaceSchema);
