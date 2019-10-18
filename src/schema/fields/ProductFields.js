import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
} from 'graphql'

export default {
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
  sku: {
    type: new GraphQLNonNull(GraphQLString),
  },
  display_name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  unit_description: {
    type: new GraphQLNonNull(GraphQLString),
  },
  unit_selling_price: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
}
