import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
import productFields from "./fields/ProductFields";

module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const productTableName = process.env[`${nodeEnv}_product_tbl_name`];
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
  };
  return Product;
};
