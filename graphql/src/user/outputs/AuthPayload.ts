import { GraphQLObjectType, GraphQLString } from 'graphql';

import GraphQLUser from './User';

export interface AuthPayload {
  token: string;
  user: any;
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
