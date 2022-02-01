import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
export function checkIfMongoID(id) {
  return ObjectId.isValid(id);
}
