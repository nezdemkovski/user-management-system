import { GraphQLServer } from 'graphql-yoga';
import * as mongoose from 'mongoose';

import Schema from './Schema';
import {
  DEV_API_TOKEN,
  MONGO_DATABASE_NAME,
  MONGO_URI,
  NODE_ENV,
  PORT,
} from './config';
import { createContext } from './utils';

const mongobdOptions = {
  dbName: MONGO_DATABASE_NAME,
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
};

mongoose.connect(
  MONGO_URI,
  mongobdOptions,
);

const db = mongoose.connection;
// tslint:disable-next-line:no-console
db.on('error', error => console.error(`Connection error: ${error}`));

const options = {
  port: PORT,
  debug: NODE_ENV === 'development',
};

const server = new GraphQLServer({
  schema: Schema,
  context: async ({ request, connection }) => {
    if (connection) {
      const token =
        connection.context.Authorization ||
        connection.context.authorization ||
        DEV_API_TOKEN;

      return createContext(token);
    } else {
      if (!request || !request.headers) {
        return;
      }
      const token = request.headers.authorization || DEV_API_TOKEN;

      return createContext(token);
    }
  },
});

server.start(options, ({ port }) => {
  // tslint:disable-next-line:no-console
  console.log(`🚀 GraphQL server listening at http://localhost:${port}/`);
});

// yakovlevyuri/bzcZfwKQATUMyWimP6iX
