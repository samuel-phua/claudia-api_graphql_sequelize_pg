import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
import productFields from "./fields/ProductFields";

module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const stageName = process.env[`${nodeEnv}StageName`];
  const tableName = process.env["productTableName"];
  const idName = process.env.idName;
  let Product = sequelize.define("Product", {
    ...getModelIdField(idName, false, DataTypes),
    ...productFields(DataTypes),
  }, {
    ...getModelConfig(`${stageName}_${tableName}`),
  });
  Product.associate = (models) => {
    models.Product.hasMany(models.ProductCategory, {
      foreignKey: `${tableName}_${idName}`,
      sourceKey: idName,
    });
  };
  return Product;
};
