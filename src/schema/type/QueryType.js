import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import categoryType from './CategoryType';
import productType from './ProductType';
import { getCategory, getProduct } from '../../store';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'root query object',
  fields: {
    category: {
      type: new GraphQLList(categoryType),
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (source, args, context) => getCategory({ id: args.id }, context),
    },
    product: {
      type: new GraphQLList(productType),
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (source, args, context) => getProduct({ id: args.id }, context),
    },
  },
});
