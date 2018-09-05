import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../utils';
import GraphQLUser, { User } from '../outputs/User';

interface Args {
  id: string;
}

export default {
  type: GraphQLUser,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, { id }: Args, { db }: Context): Promise<User> => {
    return db.user.findOne({ _id: id });
  },
};
