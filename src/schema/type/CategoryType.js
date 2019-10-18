import {
  GraphQLList,
  GraphQLObjectType,
} from 'graphql'
import categoryFields from '../fields/CategoryFields'
import productBaseType from './ProductBaseType'
import { getCategoryProducts } from '../../store'

export default new GraphQLObjectType({
  name: 'Category',
  fields: {
    ...categoryFields,
    products: {
      type: new GraphQLList(productBaseType),
      resolve: (source, args, context) => getCategoryProducts(source, context),
    },
  },
})
