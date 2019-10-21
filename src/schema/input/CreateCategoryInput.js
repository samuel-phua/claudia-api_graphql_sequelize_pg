import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from "graphql"
import categoryFields from "../fields/CategoryFields"

export default new GraphQLInputObjectType({
  name: "CreateCategoryInput",
  fields: categoryFields,
})
