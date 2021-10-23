import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
export default {
  port: process.env.PORT,
  DB_URL: process.env.DB_URL
};
