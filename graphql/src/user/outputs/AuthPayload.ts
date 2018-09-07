import { GraphQLObjectType, GraphQLString } from 'graphql';

import { UserModel } from '../../db/models/User';
import GraphQLUser from './User';

export interface AuthPayload {
  token: string;
  user: UserModel;
}

export default new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: AuthPayload): string => token,
    },
    user: {
      type: GraphQLUser,
      resolve: ({ user }: AuthPayload) => user,
    },
  },
});
