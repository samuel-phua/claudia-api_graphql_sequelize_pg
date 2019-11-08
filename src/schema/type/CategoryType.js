import {
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import idField from "../fields/IdField";
import categoryFields from "../fields/CategoryFields";
import productBaseType from "./ProductBaseType";
import { getProduct } from "../../store";

export default new GraphQLObjectType({
  name: "Category",
  fields: {
    ...idField,
    ...categoryFields,
    products: {
      type: new GraphQLList(productBaseType),
      resolve: (source, args, context) => getProduct({ categoryId: source.id }, context),
    },
  },
});
