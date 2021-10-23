import mongoose from 'mongoose';
import config from '../config';

export default {
  initDB: async () => {
    try {
      await mongoose.connect(config.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('Connected to db');
    } catch (error) {
      console.log(error);
    }
  }
};
