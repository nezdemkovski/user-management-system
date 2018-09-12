import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../../graphql';
import {
  DEV_API_TOKEN,
  MONGO_DB_NAME,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_USERNAME,
} from '../../config';
import { UserModel } from '../../db/models/User';
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
    { models }: Context,
  ): Promise<UserModel> => {
    return models.User.findOne({ _id: id });
  },
};
