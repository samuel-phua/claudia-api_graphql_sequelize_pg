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
  name: 'UpdateCategoryInput',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    display_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    display_order: {
      type: GraphQLInt,
    },
  },
})
