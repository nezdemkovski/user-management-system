import * as bcrypt from 'bcryptjs';
import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../../graphql';
import { UserModel } from '../../db/models/User';
import { getUserId, getUserRole } from '../../utils';
import GraphQLUser from '../outputs/User';
import GraphQLUserRole, { UserRole } from '../outputs/UserRole';

interface Args {
  id: string;
  update: UpdateUserInput;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profilePictureUrl?: string;
}

export default {
  type: GraphQLUser,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    update: {
      type: new GraphQLInputObjectType({
        name: 'UpdateUserInput',
        fields: {
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
          email: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          role: {
            type: GraphQLUserRole,
          },
          profilePictureUrl: {
            type: GraphQLString,
          },
        },
      }),
    },
  },
  resolve: async (
    _: any,
    args: Args,
    { apiToken, models }: Context,
  ): Promise<UserModel> => {
    const userId = getUserId(apiToken);
    const userRole = await getUserRole(userId, models);

    if (args.update) {
      if (userRole === 'ADMIN' || userRole === 'DEVELOPER') {
        return models.User.findOneAndUpdate(
          args.id,
          {
            ...args.update,
            ...(args.update.password && {
              password: await bcrypt.hash(args.update.password, 10),
            }),
          },
          { new: true },
        );
      }

      return models.User.findOneAndUpdate(
        args.id,
        {
          ...(args.update.password && {
            password: await bcrypt.hash(args.update.password, 10),
          }),
        },
        { new: true },
      );
    }

    throw new Error('You must update at least one field!');
  },
};