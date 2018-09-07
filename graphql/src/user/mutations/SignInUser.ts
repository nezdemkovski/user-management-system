import * as bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as jwt from 'jsonwebtoken';

import { Context } from '../../../graphql';
import { APP_SECRET } from '../../config';
import GraphQLAuthPayload, { AuthPayload } from '../outputs/AuthPayload';

interface ArgsType {
  email: string;
  password: string;
}

export default {
  type: GraphQLAuthPayload,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    _: any,
    { email, password }: ArgsType,
    { models }: Context,
  ): Promise<AuthPayload> => {
    const user = await models.User.findOne({ email });

    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
};
