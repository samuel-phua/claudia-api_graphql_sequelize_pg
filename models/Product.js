import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
import productFields from "./fields/ProductFields";
const nodeEnv = process.env.NODE_ENV || "development";
const productTableName = process.env[`${nodeEnv}_product_tbl_name`];

module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define("Product", {
    ...getModelIdField("id", false, DataTypes),
    ...productFields(DataTypes),
  }, {
    ...getModelConfig(productTableName),
  });
  Product.associate = (models) => {
    models.Product.hasMany(models.ProductCategory, {
      foreignKey: "product_id",
      sourceKey: "id",
    });
  }
  return Product;
};
