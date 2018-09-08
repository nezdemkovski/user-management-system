import { ApolloServer } from 'apollo-server-lambda';
import * as mongoose from 'mongoose';

import Schema from './src/Schema';
import {
  DEV_API_TOKEN,
  MONGO_DB_NAME,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_USERNAME,
} from './src/config';
import { models, startDB } from './src/db/DB';
import { UserModel } from './src/db/models/User';

export interface Context {
  apiToken: string;
  models: {
    User: mongoose.Model<UserModel>;
  };
  db: mongoose.Connection;
}

const db = startDB({
  userName: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  url: MONGO_URL,
  dbName: MONGO_DB_NAME,
});

const context = {
  models,
  db,
};

const server = new ApolloServer({
  schema: Schema,
  context: async ({ event }) => {
    return {
      apiToken: event.headers.authorization || DEV_API_TOKEN,
      ...context,
    };
  },
});

exports.graphqlHandler = server.createHandler();
