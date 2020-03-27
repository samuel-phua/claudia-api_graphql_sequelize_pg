import is from 'is_js';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

const getCursorType = () => {
  return new GraphQLNonNull(GraphQLInt);
};

const getEdgeType = (type) => {
  return new GraphQLObjectType({
    name: `${type.name}Edge`,
    fields: {
      node: {
        type: new GraphQLNonNull(type),
      },
      cursor: {
        type: getCursorType(),
      },
    },
  });
};

const getPageInfoType = () => {
  return new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
      hasPreviousPage: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      hasNextPage: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      startCursor: {
        type: getCursorType(),
      },
      endCursor: {
        type: getCursorType(),
      },
      totalPages: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
  });
};

export const getConnectionType = (type) => {
  return new GraphQLObjectType({
    name: `${type.name}Connection`,
    fields: {
      edges: {
        type: new GraphQLNonNull(new GraphQLList(getEdgeType(type))),
      },
      pageInfo: {
        type: new GraphQLNonNull(getPageInfoType()),
      },
      totalCount: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
  });
};

export const getConnectionModel = ({ count, rows }, { first, after }) => {
  let endCursor;
  if (count >= after + first) {
    endCursor = after + first;
  } else if (count > 0) {
    endCursor = count - 1;
  } else {
    endCursor = 0;
  }
  return {
    edges: rows.map((row, index) => {
      return {
        node: row,
        cursor: index,
      };
    }),
    pageInfo: {
      hasPreviousPage: after > 0,
      hasNextPage: count > after + first,
      startCursor: count >= after ? after : 0,
      endCursor,
      totalPages: Math.ceil((1.0 * count) / first),
    },
    totalCount: count,
  };
};

export const getSingleNodeFromConnection = (connection) => {
  if (
    is.number(connection.totalCount) &&
    connection.totalCount === 1 &&
    is.existy(connection.edges) &&
    is.array(connection.edges) &&
    connection.edges.length === 1
  ) {
    return connection.edges[0].node;
  }
  return null;
};
