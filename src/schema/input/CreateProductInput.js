import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql'

export default new GraphQLInputObjectType({
  name: 'CreateProductInput',
  fields: {
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
  },
})
