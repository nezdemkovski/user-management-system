import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import GraphQLUserRole from '../outputs/UserRole';
import { UserRole } from './UserRole';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePictureUrl: string;
  active: boolean;
}

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }: User): string => id,
    },
    firstName: {
      type: GraphQLString,
      resolve: ({ firstName }: User): string => firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: ({ lastName }: User): string => lastName,
    },
    email: {
      type: GraphQLString,
      resolve: ({ email }: User): string => email,
    },
    role: {
      type: GraphQLUserRole,
      resolve: ({ role }: User): UserRole => role,
    },
    profilePictureUrl: {
      type: GraphQLString,
      resolve: ({ profilePictureUrl }: User): string => profilePictureUrl,
    },
    active: {
      type: GraphQLBoolean,
      resolve: ({ active }: User): boolean => active,
    },
  },
});
