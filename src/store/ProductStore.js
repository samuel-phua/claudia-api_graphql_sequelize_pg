import is from "is_js";
import log from "lambda-log";
import {
  getContextForLog,
  mapArrayItemProperty,
} from "../utils";

export const getProduct = (filter, context) => {
  if (is.existy(filter.id)) {
    return getProductById(filter.id, context);
  } else if (is.existy(filter.categoryId)) {
    return getProductByCategory(filter.categoryId, context);
  } else {
    const options = {
      order: [
        ["sku", "ASC"],
      ],
      limit: parseInt(process.env["defaultListSizeLimit"], 10),
    };
    return context.pg.Product.findAll(options).then((result) => {
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
  }
};

const getProductById = (id, context) => {
  return context.pg.Product.findByPk(id).then((result) => {
    log.info("getProduct completed successfully", {
      ...getContextForLog(context),
      { primaryKey: id },
      result,
    });
    return result;
  }).catch((error) => {
    log.error("getProduct failed to complete", {
      ...getContextForLog(context),
      { primaryKey: id },
      error,
    });
    return null;
  });
};

const getProductByCategory = (categoryId, context) => {
  const pg = context.pg;
  const options = {
    where: {
      category_id: categoryId,
    },
    include: [ pg.Product ],
  };
  return pg.ProductCategory.findAll(options).then((result) => {
    log.info("getProduct completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    return mapArrayItemProperty(result, "Product");
  }).catch((error) => {
    log.error("getProduct failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};

// export const getProductCategories = (product, context) => {
//   const pg = context.pg;
//   const options = {
//     where: {
//       product_id: product.id,
//     },
//     include: [ pg.Category ],
//   };
//   return pg.ProductCategory.findAll(options).then((result) => {
//     log.info("getProductCategories completed successfully", {
//       ...getContextForLog(context),
//       options,
//       result,
//     });
//     return mapArrayItemProperty(result, "Category");
//   }).catch((error) => {
//     log.error("getProductCategories failed to complete", {
//       ...getContextForLog(context),
//       options,
//       error,
//     });
//     return null;
//   });
// };

export const createProduct = (product, context) => {
  const pg = context.pg;
  const fields = ["sku", "display_name", "unit_description", "unit_selling_price"];
  return pg.Product.create(product, { fields }).then((result) => {
    log.info("createProduct completed successfully", {
      ...getContextForLog(context),
      product,
      fields,
      result,
    });
    return result;
  }).catch((error) => {
    log.error("createProduct failed to complete", {
      ...getContextForLog(context),
      product,
      fields,
      error,
    });
    return null;
  });
};

export const updateProduct = (product, context) => {
  const pg = context.pg;
  const fields = ["sku", "display_name", "unit_description", "unit_selling_price"];
  const options = {
    where: {
      id: product.id,
    },
    fields,
  };
  return pg.Product.update(product, options).then((result) => {
    log.info("updateProduct completed successfully", {
      ...getContextForLog(context),
      product,
      options,
      result,
    });
    return result;
  }).catch((error) => {
    log.error("updateProduct failed to complete", {
      product,
      options,
      error,
    });
    return null;
  });
};

export const deleteProduct = (productId, context) => {
  const pg = context.pg;
  const options = {
    where: {
      id: productId,
    }
  };
  return pg.Product.destroy(options).then((result) => {
    log.info("deleteProduct completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    return result;
  }).catch((error) => {
    log.error("deleteProduct failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};
