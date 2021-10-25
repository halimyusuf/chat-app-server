import mongoose from 'mongoose';
import { jwtSecret } from '../config';

const userSchema = mongoose.Schema(
  {
    firstname: {
      required: true,
      type: String
    },
    lastname: {
      required: true,
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
    // workspaces: {
    //   type: [mongoose.SchemaTypes.Types.ObjectId],
    //   ref: 'Workspace'
    // }
  },
  { timestamps: true }
);

WorkspaceSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      avatar: this.avatar,
      firstname: this.first,
      lastname: this.lastname,
      email: this.email,
      isAdmin: this.isAdmin
    },
    jwtSecret,
    { expiresIn: '5m' }
  );
  return token;
};

export default mongoose.Model('User', userSchema);
