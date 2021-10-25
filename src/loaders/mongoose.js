import mongoose from 'mongoose';
import { DB_URL } from '../config';

export default {
  initDB: async () => {
    try {
      await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log('Connected to db');
    } catch (error) {
      console.log(error);
    }
  }
};
