import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || '';
export const APP_SECRET = process.env.APP_SECRET || '';
export const DEV_API_TOKEN = process.env.DEV_API_TOKEN || '';
