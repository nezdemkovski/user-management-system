import * as bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as jwt from 'jsonwebtoken';

import { APP_SECRET } from '../../config';
import { getUserId, getUserRole, Context } from '../../utils';
import GraphQLAuthPayload, { AuthPayload } from '../outputs/AuthPayload';
import GraphQLUserRole, { UserRole } from '../outputs/UserRole';

interface Args {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  profilePictureUrl: string;
}

export default {
  type: GraphQLAuthPayload,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLUserRole),
    },
    profilePictureUrl: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    _: any,
    args: Args,
    { apiToken, db }: Context,
  ): Promise<AuthPayload> => {
    const userId = getUserId(apiToken);
    const userRole = await getUserRole(userId, db);

    if (userRole === 'ADMIN' || userRole === 'DEVELOPER') {
      const checkEmail = await db.user.findOne({ email: args.email });
      if (checkEmail) {
        throw new Error(`Email address already in use`);
      }

      const newUser = await db
        .user({
          ...args,
          password: await bcrypt.hash(args.password, 10),
          active: true,
        })
        .save();

      return {
        token: jwt.sign({ userId: newUser.id }, APP_SECRET),
        user: newUser,
      };
    }

    throw new Error('You have no right to do that!');
  },
};
