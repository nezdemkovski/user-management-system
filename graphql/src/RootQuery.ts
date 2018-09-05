import { GraphQLObjectType } from 'graphql';

import CurrentUser from './user/queries/CurrentUser';
import User from './user/queries/User';
import Users from './user/queries/Users';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    user: User,
    users: Users,
    currentUser: CurrentUser,
  },
});
