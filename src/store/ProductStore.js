import is from 'is_js'
import log from 'lambda-log'
import { getLogContext } from '../utils'

export const getProduct = (productId, context) => {
  const pg = context.pg
  let productOptions = {
    order: [
      ['sku', 'ASC'],
    ],
  }
  if (is.existy(productId)) {
    productOptions.where.id = productId
  }
  return pg.Product.findAll(productOptions).then(result => {
    log.info(`getProduct completed successfully`, {
      ...getLogContext(context),
      options: productOptions,
      result: result,
    })
    if (is.not.array(result)) {
      return null
    } else {
      return result
    }
  }).catch(err => {
    log.error(`getProduct failed to complete`, {
      ...getLogContext(context),
      options: productOptions,
      error: err,
    })
    return null
  })
}

export const getProductCategories = (product, context) => {
  const pg = context.pg
  const productCategoryOptions = {
    where: {
      product_id: product.id,
    },
    include: [ pg.Category ],
  }
  return pg.ProductCategory.findAll(productCategoryOptions).then(result => {
    log.info(`getProductCategories completed successfully`, {
      ...getLogContext(context),
      options: productCategoryOptions,
      result: result,
    })
    if (is.array(result) && result.length > 0) {
      return result.map(spcItem => {
        if (is.propertyDefined(spcItem, 'Category')) {
          return spcItem['Category']
        } else {
          return null
        }
      })
    } else {
      return null
    }
  }).catch(err => {
    log.error(`getProductCategories failed to complete`, {
      ...getLogContext(context),
      options: productCategoryOptions,
      error: err,
    })
    return null
  })
}

export const createProduct = (product, context) => {
  return null
}

export const updateProduct = (product, context) => {
  return null
}

export const deleteProduct = (productId, context) => {
  return null
}
