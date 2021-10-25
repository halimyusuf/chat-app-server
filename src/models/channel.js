import mongoose from 'mongoose';

const channelSchema = mongoose.Schema(
  {
    users: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    name: {
      type: String,
      required: true
    },
    public: {
      type: Boolean,
      default: true
    },
    workspace: {}
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);