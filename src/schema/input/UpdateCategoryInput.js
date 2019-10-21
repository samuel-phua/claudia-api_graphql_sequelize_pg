import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from "graphql";
import idField from "../fields/IdField";
import categoryFields from "../fields/CategoryFields";

export default new GraphQLInputObjectType({
  name: "UpdateCategoryInput",
  fields: {
    ...idField,
    ...categoryFields,
  },
});
