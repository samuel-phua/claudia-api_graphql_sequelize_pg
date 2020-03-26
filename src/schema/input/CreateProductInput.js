import { GraphQLInputObjectType } from 'graphql';
import productFields from '../fields/ProductFields';

export default new GraphQLInputObjectType({
  name: 'CreateProductInput',
  fields: productFields,
});
