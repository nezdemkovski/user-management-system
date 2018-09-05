import { GraphQLNonNull, GraphQLString } from 'graphql';

import { getUserId, Context } from '../../utils';
import GraphQLUser, { User } from '../outputs/User';

export default {
  type: GraphQLUser,
  resolve: async (
    _: any,
    Args: any,
    { apiToken, db }: Context,
  ): Promise<User> => {
    const userId = await getUserId(apiToken);

    return db.user.findOne({ _id: userId });
  },
};
