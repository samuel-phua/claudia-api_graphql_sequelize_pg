import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} from 'graphql'

export default {
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
  display_name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  display_order: {
    type: GraphQLInt,
  },
}
