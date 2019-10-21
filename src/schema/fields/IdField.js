import {
  GraphQLNonNull,
  GraphQLID,
} from "graphql"

export default {
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
}
