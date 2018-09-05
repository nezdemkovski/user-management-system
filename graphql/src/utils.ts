import * as jwt from 'jsonwebtoken';

import { APP_SECRET } from './config';
import User from './user/models/User';
import { UserRole } from './user/outputs/UserRole';

export interface Context {
  apiToken: string;
  db: any;
}

const getMongoInstance = () => {
  return {
    user: User,
  };
};

export function createContext(token: string): Context {
  return {
    apiToken: token,
    db: getMongoInstance(),
  };
}

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

export async function getUserRole(userId: string, db: any): Promise<UserRole> {
  const { role } = (await db.user.findOne({ _id: userId })) as {
    role: UserRole;
  };

  return role;
}
