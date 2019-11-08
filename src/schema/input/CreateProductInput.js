import {
  GraphQLInputObjectType,
} from "graphql";
import productFields from "../fields/productFields";

export default new GraphQLInputObjectType({
  name: "CreateProductInput",
  fields: productFields,
});
