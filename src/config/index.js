import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const port = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const jwtSecret = process.env.JWT_SECRET;
