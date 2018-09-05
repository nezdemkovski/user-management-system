import { GraphQLObjectType } from 'graphql';

import CreateUser from './user/mutations/CreateUser';
import DeleteUser from './user/mutations/DeleteUser';
import SignInUser from './user/mutations/SignInUser';
import UpdateUser from './user/mutations/UpdateUser';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    updateUser: UpdateUser,
    signInUser: SignInUser,
  },
});
