import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../../graphql';
import { UserModel } from '../../db/models/User';
import { getUserId, getUserRole } from '../../utils';
import GraphQLUser from '../outputs/User';

interface Args {
  id: string;
}

export default {
  type: GraphQLUser,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (
    _: any,
    { id }: Args,
    { apiToken, models, db }: Context,
  ): Promise<UserModel> => {
    const userId = getUserId(apiToken);
    const userRole = await getUserRole(userId, models);

    if (userRole === 'ADMIN') {
      const deletedUser = await models.User.findOneAndRemove({ _id: id });
      if (!deletedUser) {
        throw new Error('No such user found!');
      }

      db.close();

      return deletedUser;
    }

    throw new Error('You have no right to do that!');
  },
};
