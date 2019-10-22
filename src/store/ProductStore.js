import is from "is_js";
import log from "lambda-log";
import {
  getContextForLog,
  mapArrayItemProperty,
} from "../utils";

export const getProduct = (productId, context) => {
  const pg = context.pg;
  let options = {
    order: [
      ["sku", "ASC"],
    ],
  };
  if (is.existy(productId)) {
    options.where.id = productId;
  }
  return pg.Product.findAll(options).then((result) => {
    log.info("getProduct completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    if (is.not.array(result)) {
      return null;
    } else {
      return result;
    }
  }).catch((error) => {
    log.error("getProduct failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};

export const getProductCategories = (product, context) => {
  const pg = context.pg;
  const options = {
    where: {
      product_id: product.id,
    },
    include: [ pg.Category ],
  };
  return pg.ProductCategory.findAll(options).then((result) => {
    log.info("getProductCategories completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    return mapArrayItemProperty(result, "Category");
  }).catch((error) => {
    log.error("getProductCategories failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};

export const createProduct = (product, context) => {
  return null;
};

export const updateProduct = (product, context) => {
  return null;
};

export const deleteProduct = (productId, context) => {
  return null;
};
