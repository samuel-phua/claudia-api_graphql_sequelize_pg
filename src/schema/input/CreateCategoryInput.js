import {
  GraphQLInputObjectType,
} from "graphql";
import categoryFields from "../fields/CategoryFields";

export default new GraphQLInputObjectType({
  name: "CreateCategoryInput",
  fields: categoryFields,
});
