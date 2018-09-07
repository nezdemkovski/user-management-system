import * as jwt from 'jsonwebtoken';

import { APP_SECRET } from './config';
import { UserRole } from './user/outputs/UserRole';

export function getUserId(token: string): string {
  if (token) {
    const apiToken = token.replace('Bearer ', '');
    const { userId } = jwt.verify(apiToken, APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new Error('Not authorized');
}

export async function getUserRole(
  userId: string,
  models: any,
): Promise<UserRole> {
  const { role } = (await models.User.findOne({ _id: userId })) as {
    role: UserRole;
  };

  return role;
}
