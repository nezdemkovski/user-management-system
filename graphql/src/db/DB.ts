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
  useNewUrlParser: true,
};

export const startDB = ({ userName, password, url, dbName }: Connect) => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    `mongodb+srv://${userName}:${password}@${url}/${dbName}`,
    mongobdOptions,
  );
  const db = mongoose.connection;

  db.on('error', error => {
    // tslint:disable-next-line:no-console
    console.error(`Connection error: ${error}`);
  });

  return db;
};

export const models = {
  User,
};
