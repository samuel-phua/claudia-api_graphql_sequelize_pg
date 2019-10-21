import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from "graphql"
import idField from "../fields/IdField"
import productFields from "../fields/ProductFields"

export default new GraphQLInputObjectType({
  name: "UpdateProductInput",
  fields: {
    ...idField,
    ...productFields,
  },
})
