import * as mongoose from 'mongoose';
import User from './models/User';

interface Connect {
  userName: string;
  password: string;
  url: string;
  dbName: string;
}

(mongoose as any).Promise = global.Promise;

const mongobdOptions = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
};

export const startDB = ({ userName, password, url, dbName }: Connect) => {
  mongoose.connect(
    `mongodb+srv://${userName}:${password}@${url}/${dbName}`,
    mongobdOptions,
  );
  const db = mongoose.connection;
  // tslint:disable-next-line:no-console
  db.on('error', error => console.error(`Connection error: ${error}`));

  return db;
};

export const models = {
  User,
};
