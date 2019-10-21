import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from "graphql";
import categoryType from "./CategoryType";
import productType from "./ProductType";
import {
  getCategory,
  getProduct,
} from "../../store";

export default new GraphQLObjectType({
  name: "Query",
  description: "root query object",
  fields: {
    category: {
      type: new GraphQLList(categoryType),
      args: {
        categoryId: {
          type: GraphQLString,
        },
      },
      resolve: (source, args, context) => getCategory(args.categoryId, context),
    },
    product: {
      type: new GraphQLList(productType),
      args: {
        productId: {
          type: GraphQLString,
        },
      },
      resolve: (source, args, context) => getProduct(args.productId, context),
    },
  },
});
