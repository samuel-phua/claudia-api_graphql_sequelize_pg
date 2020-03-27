import { GraphQLSchema } from 'graphql';
import queryType from './type/QueryType';
import mutationType from './type/MutationType';

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
