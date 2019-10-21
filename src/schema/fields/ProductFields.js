import {
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString,
} from "graphql"

export default {
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
