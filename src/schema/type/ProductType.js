import {
  GraphQLList,
  GraphQLObjectType,
} from "graphql"
import idField from "../fields/IdField"
import productFields from "../fields/ProductFields"
import categoryBaseType from "./CategoryBaseType"
import { getProductCategories } from "../../store"

export default new GraphQLObjectType({
  name: "Product",
  fields: {
    ...idField,
    ...productFields,
    categories: {
      type: new GraphQLList(categoryBaseType),
      resolve: (source, args, context) => getProductCategories(source, context),
    },
  },
})
