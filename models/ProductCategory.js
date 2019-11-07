import {
  getModelReferenceField,
  getModelConfig,
} from "../bin/utils";

module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const productCategoryTableName = process.env[`${nodeEnv}_product_category_tbl_name`];
  let ProductCategory = sequelize.define("ProductCategory", {
    ...getModelReferenceField(stage, "category", "id", true, false, DataTypes),
    ...getModelReferenceField(stage, "product", "id", true, false, DataTypes),
  }, {
    ...getModelConfig(productCategoryTableName),
  });
  ProductCategory.associate = (models) => {
    models.ProductCategory.belongsTo(models.Category, {
      foreignKey: "category_id",
      targetKey: "id",
    });
    models.ProductCategory.belongsTo(models.Product, {
      foreignKey: "product_id",
      targetKey: "id",
    });
  };
  return ProductCategory;
};
