import {
  GraphQLObjectType,
} from 'graphql'
import productFields from '../fields/ProductFields'

export default new GraphQLObjectType({
  name: 'ProductBase',
  fields: {
    ...productFields,
  },
})
