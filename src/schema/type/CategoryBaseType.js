import { GraphQLObjectType } from 'graphql';
import idField from '../fields/IdField';
import categoryFields from '../fields/CategoryFields';

export default new GraphQLObjectType({
  name: 'CategoryBase',
  fields: {
    ...idField,
    ...categoryFields,
  },
});
