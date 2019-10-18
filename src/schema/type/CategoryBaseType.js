import {
  GraphQLObjectType,
} from 'graphql'
import categoryFields from '../fields/CategoryFields'

export default new GraphQLObjectType({
  name: 'CategoryBase',
  fields: {
    ...categoryFields,
  },
})
