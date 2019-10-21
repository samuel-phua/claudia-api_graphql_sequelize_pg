import is from "is_js";
import log from "lambda-log";
import { getLogContext } from "../utils";

export const getCategory = (categoryId, context) => {
  const pg = context.pg;
  let categoryOptions = {
    order: [
      ["display_order", "ASC"],
    ],
  };
  if (is.existy(categoryId)) {
    categoryOptions.where.id = categoryId;
  }
  return pg.Category.findAll(categoryOptions).then((result) => {
    log.info(`getCategory completed successfully`, {
      ...getLogContext(context),
      options: categoryOptions,
      result: result,
    });
    if (is.not.array(result)) {
      return null;
    } else {
      return result;
    }
  }).catch((err) => {
    log.error(`getCategory failed to complete`, {
      ...getLogContext(context),
      options: categoryOptions,
      error: err,
    });
    return null;
  });
};

export const getCategoryProducts = (category, context) => {
  const pg = context.pg;
  const productCategoryOptions = {
    where: {
      category_id: category.id,
    },
    include: [ pg.Product ],
  };
  return pg.ProductCategory.findAll(productCategoryOptions).then((result) => {
    log.info(`getCategoryProducts completed successfully`, {
      ...getLogContext(context),
      options: productCategoryOptions,
      result: result,
    });
    if (is.array(result) && result.length > 0) {
      return result.map((spcItem) => {
        if (is.propertyDefined(spcItem, 'Product')) {
          return spcItem['Product'];
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  }).catch((err) => {
    log.error(`getCategoryProducts failed to complete`, {
      ...getLogContext(context),
      options: productCategoryOptions,
      error: err,
    });
    return null;
  });
};

export const createCategory = (category, context) => {
  return null;
};

export const updateCategory = (category, context) => {
  return null;
};

export const deleteCategory = (categoryId, context) => {
  return null;
};
