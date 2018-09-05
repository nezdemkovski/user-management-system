export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT =
  (process.env.PORT && parseInt(process.env.PORT, 10)) || 4000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || '';
export const APP_SECRET = process.env.APP_SECRET || '';
export const DEV_API_TOKEN = process.env.DEV_API_TOKEN || '';
