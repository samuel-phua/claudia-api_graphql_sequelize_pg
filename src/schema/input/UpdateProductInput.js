import { GraphQLInputObjectType } from 'graphql';
import idField from '../fields/IdField';
import productFields from '../fields/ProductFields';

export default new GraphQLInputObjectType({
  name: 'UpdateProductInput',
  fields: {
    ...idField,
    ...productFields,
  },
});
