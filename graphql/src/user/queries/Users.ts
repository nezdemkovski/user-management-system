import { GraphQLList } from 'graphql';

import { Context } from '../../utils';
import GraphQLUser, { User } from '../outputs/User';

export default {
  type: new GraphQLList(GraphQLUser),
  resolve: async (_: any, args: any, { db }: Context): Promise<User[]> => {
    return db.user.find();
  },
};
