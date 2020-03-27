import { GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';

export default {
  display_name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  display_order: {
    type: GraphQLInt,
  },
};
