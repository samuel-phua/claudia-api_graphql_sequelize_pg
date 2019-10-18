import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import categoryType from './CategoryType'
import productType from './ProductType'
import createCategoryInput from '../input/CreateCategoryInput'
import updateCategoryInput from '../input/UpdateCategoryInput'
import createProductInput from '../input/CreateProductInput'
import updateProductInput from '../input/UpdateProductInput'
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../store'

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'root mutation object',
  fields: {
    createCategory: {
      type: categoryType,
      args: {
        input: {
          type: createCategoryInput,
        },
      },
      resolve: (source, args, context) => createCategory(args, context),
    },
    updateCategory: {
      type: categoryType,
      args: {
        input: {
          type: updateCategoryInput,
        },
      },
      resolve: (source, args, context) => updateCategory(args, context),
    },
    deleteCategory: {
      type: categoryType,
      args: {
        categoryId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, args, context) => deleteCategory(args, context),
    },
    createProduct: {
      type: productType,
      args: {
        input: {
          type: createProductInput,
        },
      },
      resolve: (source, args, context) => createProduct(args, context),
    },
    updateProduct: {
      type: productType,
      args: {
        input: {
          type: updateProductInput,
        },
      },
      resolve: (source, args, context) => updateProduct(args, context),
    },
    deleteProduct: {
      type: productType,
      args: {
        productId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, args, context) => deleteProduct(args, context),
    },
  },
})
