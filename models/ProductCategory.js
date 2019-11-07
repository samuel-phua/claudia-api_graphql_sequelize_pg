import {
  getModelReferenceField,
  getModelConfig,
} from "../bin/utils";

module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const stageName = process.env[`${nodeEnv}StageName`];
  const tableName = process.env["productCategoryTableName"];
  const productTableName = process.env["productTableName"];
  const categoryTableName = process.env["categoryTableName"];
  const idName = process.env.idName;
  let ProductCategory = sequelize.define("ProductCategory", {
    ...getModelReferenceField(stageName, productTableName, idName, true, false, DataTypes),
    ...getModelReferenceField(stageName, categoryTableName, idName, true, false, DataTypes),
  }, {
    ...getModelConfig(`${stageName}_${tableName}`),
  });
  ProductCategory.associate = (models) => {
    models.ProductCategory.belongsTo(models.Product, {
      foreignKey: `${productTableName}_${idName}`,
      targetKey: idName,
    });
    models.ProductCategory.belongsTo(models.Category, {
      foreignKey: `${categoryTableName}_${idName}`,
      targetKey: idName,
    });
  };
  return ProductCategory;
};
