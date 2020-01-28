import is from "is_js";
import log from "lambda-log";
import {
  getContextForLog,
  mapArrayItemProperty,
} from "../utils";

export const getCategory = (filter, context) => {
  if (is.existy(filter.id)) {
    return getCategoryById(filter.id, context);
  } else if (is.existy(filter.productId)) {
    return getCategoryByProduct(filter.productId, context);
  } else {
    const options = {
      order: [
        ["display_order", "ASC"],
      ],
      limit: parseInt(process.env["defaultListSizeLimit"], 10),
    };
    return context.pg.Category.findAll(options).then((result) => {
      log.info("getCategory completed successfully", {
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
      log.error("getCategory failed to complete", {
        ...getContextForLog(context),
        options,
        error,
      });
      return null;
    });
  }
};

const getCategoryById = (id, context) => {
  return context.pg.Category.findByPk(id).then((result) => {
    log.info("getCategory completed successfully", {
      ...getContextForLog(context),
      { primaryKey: id },
      result,
    });
    return result;
  }).catch((error) => {
    log.error("getCategory failed to complete", {
      ...getContextForLog(context),
      { primaryKey: id },
      error,
    });
    return null;
  });
};

const getCategoryByProduct = (productId, context) => {
  const pg = context.pg;
  const options = {
    where: {
      product_id: productId,
    },
    include: [ pg.Category ],
  };
  return pg.ProductCategory.findAll(options).then((result) => {
    log.info("getCategory completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    return mapArrayItemProperty(result, "Category");
  }).catch((error) => {
    log.error("getCategory failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};

// export const getCategoryProducts = (category, context) => {
//   const pg = context.pg;
//   const options = {
//     where: {
//       category_id: category.id,
//     },
//     include: [ pg.Product ],
//   };
//   return pg.ProductCategory.findAll(options).then((result) => {
//     log.info("getCategoryProducts completed successfully", {
//       ...getContextForLog(context),
//       options,
//       result,
//     });
//     return mapArrayItemProperty(result, "Product");
//   }).catch((error) => {
//     log.error("getCategoryProducts failed to complete", {
//       ...getContextForLog(context),
//       options,
//       error,
//     });
//     return null;
//   });
// };

export const createCategory = (category, context) => {
  const pg = context.pg;
  const fields = ["display_name", "display_order"];
  return pg.Category.create(category, { fields }).then((result) => {
    log.info("createCategory completed successfully", {
      ...getContextForLog(context),
      category,
      fields,
      result,
    });
    return result;
  }).catch((error) => {
    log.error("createCategory failed to complete", {
      ...getContextForLog(context),
      category,
      fields,
      error,
    });
    return null;
  });
};

export const updateCategory = (category, context) => {
  const pg = context.pg;
  const fields = ["display_name", "display_order"];
  const options = {
    where: {
      id: category.id,
    },
    fields,
  };
  return pg.Category.update(category, options).then((result) => {
    log.info("updateCategory completed successfully", {
      ...getContextForLog(context),
      category,
      options,
      result,
    });
    return result;
  }).catch((error) => {
    log.error("updateCategory failed to complete", {
      ...getContextForLog(context),
      category,
      options,
      error,
    });
    return null;
  });
};

export const deleteCategory = (categoryId, context) => {
  const pg = context.pg;
  const options = {
    where: {
      id: categoryId,
    }
  };
  return pg.Category.destroy(options).then((result) => {
    log.info("deleteCategory completed successfully", {
      ...getContextForLog(context),
      options,
      result,
    });
    return result; // number of deleted rows
  }).catch((error) => {
    log.error("deleteCategory failed to complete", {
      ...getContextForLog(context),
      options,
      error,
    });
    return null;
  });
};
