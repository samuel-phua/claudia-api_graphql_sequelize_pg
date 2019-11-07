import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
import categoryFields from "./fields/CategoryFields";

module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const stageName = process.env[`${nodeEnv}StageName`];
  const tableName = process.env["categoryTableName"];
  const idName = process.env.idName;
  let Category = sequelize.define("Category", {
    ...getModelIdField(idName, false, DataTypes),
    ...categoryFields(DataTypes),
  }, {
    ...getModelConfig(`${stageName}_${tableName}`),
  });
  Category.associate = (models) => {
    models.Category.hasMany(models.ProductCategory, {
      foreignKey: `${tableName}_${idName}`,
      sourceKey: idName,
    });
  };
  return Category;
};
