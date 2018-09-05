import { GraphQLNonNull, GraphQLString } from 'graphql';

import { getUserId, getUserRole, Context } from '../../utils';
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
  resolve: async (
    _: any,
    { id }: Args,
    { apiToken, db }: Context,
  ): Promise<User> => {
    const userId = getUserId(apiToken);
    const userRole = await getUserRole(userId, db);

    if (userRole === 'ADMIN') {
      const deletedUser = await db.user.findOneAndDelete({ _id: id });
      if (!deletedUser) {
        throw new Error('No such user found!');
      }

      return deletedUser;
    }

    throw new Error('You have no right to do that!');
  },
};
