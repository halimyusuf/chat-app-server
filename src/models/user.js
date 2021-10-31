import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
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
    },
    avatar: String
    // workspaces: {
    //   type: [mongoose.SchemaTypes.Types.ObjectId],
    //   ref: 'Workspace'
    // }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      avatar: this.avatar,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    },
    jwtSecret,
    { expiresIn: '30m' }
  );
  return token;
};

export default mongoose.model('User', userSchema);
