import { GraphQLEnumType } from 'graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  EDITOR = 'EDITOR',
}

export default new GraphQLEnumType({
  name: 'UserRole',
  values: {
    ADMIN: {
      value: 'ADMIN',
    },
    DEVELOPER: {
      value: 'DEVELOPER',
    },
    EDITOR: {
      value: 'EDITOR',
    },
  },
});
