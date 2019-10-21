import {
  getModelIdField,
  getModelConfig,
} from "../bin/utils";
import categoryFields from "./fields/CategoryFields";
const nodeEnv = process.env.NODE_ENV || "development";
const categoryTableName = process.env[`${nodeEnv}_category_tbl_name`];

module.exports = (sequelize, DataTypes) => {
  let Category = sequelize.define("Category", {
    ...getModelIdField("id", false, DataTypes),
    ...categoryFields(DataTypes),
  }, {
    ...getModelConfig(categoryTableName),
  });
  Category.associate = (models) => {
    models.Category.hasMany(models.ProductCategory, {
      foreignKey: "category_id",
      sourceKey: "id",
    });
  }
  return Category;
};
