import { GraphQLObjectType } from 'graphql';
import idField from '../fields/IdField';
import productFields from '../fields/ProductFields';

export default new GraphQLObjectType({
  name: 'ProductBase',
  fields: {
    ...idField,
    ...productFields,
  },
});
