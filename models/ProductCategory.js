import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
const nodeEnv = process.env.NODE_ENV || "development";
const productCategoryTableName = process.env[`${nodeEnv}_product_category_tbl_name`];

module.exports = (sequelize, DataTypes) => {
  let ProductCategory = sequelize.define("ProductCategory", {
    ...getModelIdField("id", false, DataTypes),
    category_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
  }, {
    ...getModelConfig(productCategoryTableName),
  })
  ProductCategory.associate = (models) => {
    models.ProductCategory.belongsTo(models.Category, {
      foreignKey: "category_id",
      targetKey: "id",
    })
    models.ProductCategory.belongsTo(models.Product, {
      foreignKey: "product_id",
      targetKey: "id",
    });
  }
  return ProductCategory;
};
