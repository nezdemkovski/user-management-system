import { GraphQLList } from 'graphql';

import { Context } from '../../../graphql';
import { UserModel } from '../../db/models/User';
import GraphQLUser from '../outputs/User';

export default {
  type: new GraphQLList(GraphQLUser),
  resolve: async (_: any, args: any, ctx: Context): Promise<UserModel[]> => {
    return ctx.models.User.find();
  },
};
