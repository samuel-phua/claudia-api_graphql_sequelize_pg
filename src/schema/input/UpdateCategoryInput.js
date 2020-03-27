import { GraphQLInputObjectType } from 'graphql';
import idField from '../fields/IdField';
import categoryFields from '../fields/CategoryFields';

export default new GraphQLInputObjectType({
  name: 'UpdateCategoryInput',
  fields: {
    ...idField,
    ...categoryFields,
  },
});
