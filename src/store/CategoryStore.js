import is from "is_js";
import log from "lambda-log";
import {
  getLogContext,
  mapArrayItemProperty,
} from "../utils";

export const getCategory = (categoryId, context) => {
  const pg = context.pg;
  let options = {
    order: [
      ["display_order", "ASC"],
    ],
  };
  if (is.existy(categoryId)) {
    options.where.id = categoryId;
  }
  return pg.Category.findAll(options).then((result) => {
    log.info("getCategory completed successfully", {
      ...getLogContext(context),
      options,
      result,
    });
    if (is.not.array(result)) {
      return null;
    } else {
      return result;
    }
  }).catch((error) => {
    log.error("getCategory failed to complete", {
      ...getLogContext(context),
      options,
      error,
    });
    return null;
  });
};

export const getCategoryProducts = (category, context) => {
  const pg = context.pg;
  const options = {
    where: {
      category_id: category.id,
    },
    include: [ pg.Product ],
  };
  return pg.ProductCategory.findAll(options).then((result) => {
    log.info("getCategoryProducts completed successfully", {
      ...getLogContext(context),
      options,
      result,
    });
    return mapArrayItemProperty(result, "Product");
  }).catch((error) => {
    log.error("getCategoryProducts failed to complete", {
      ...getLogContext(context),
      options,
      error,
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
