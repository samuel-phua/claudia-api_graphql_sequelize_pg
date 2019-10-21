import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from "graphql"
import productFields from "../fields/productFields"

export default new GraphQLInputObjectType({
  name: "CreateProductInput",
  fields: productFields,
})
