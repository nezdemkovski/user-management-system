import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../../graphql';
import { UserModel } from '../../db/models/User';
import { getUserId } from '../../utils';
import GraphQLUser from '../outputs/User';

export default {
  type: GraphQLUser,
  resolve: async (
    _: any,
    Args: any,
    { apiToken, models, db }: Context,
  ): Promise<UserModel> => {
    const userId = await getUserId(apiToken);

    return models.User.findOne({ _id: userId }, () => {
      db.close();
    });
  },
};
