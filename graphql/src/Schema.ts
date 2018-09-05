import { GraphQLSchema } from 'graphql';

import RootMutation from './RootMutation';
import RootQuery from './RootQuery';

const schemaDefinition = {
  query: RootQuery,
  mutation: RootMutation,
};

export default new GraphQLSchema(schemaDefinition);
