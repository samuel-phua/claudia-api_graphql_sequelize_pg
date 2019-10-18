import {
  GraphQLList,
  GraphQLObjectType,
} from 'graphql'
import productFields from '../fields/ProductFields'
import categoryBaseType from './CategoryBaseType'
import { getProductCategories } from '../../store'

export default new GraphQLObjectType({
  name: 'Product',
  fields: {
    ...productFields,
    categories: {
      type: new GraphQLList(categoryBaseType),
      resolve: (source, args, context) => getProductCategories(source, context),
    },
  },
})
