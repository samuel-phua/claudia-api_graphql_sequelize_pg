"use strict";
const is = require("is_js");
let utils = require("../bin/utils");
if (is.not.existy(utils)) {
  utils = require("../src/utils");
}
function getProductCategoryModel(stage, Sequelize) {
  return {
    ...utils.getModelIdField("id", true, Sequelize),
    ...utils.getModelReferenceField(stage, "category", "id", true, Sequelize),
    ...utils.getModelReferenceField(stage, "product", "id", true, Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}
const devTableName = "dev_product_category";
const prodTableName = "prod_product_category";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getProductCategoryModel("dev", Sequelize)),
      queryInterface.createTable(prodTableName, getProductCategoryModel("prod", Sequelize)),
    ]);
    await Promise.all([
      queryInterface.sequelize.query(utils.getTimestampColumnsAlterTypeSql(devTableName)),
      queryInterface.sequelize.query(utils.getTimestampColumnsAlterTypeSql(prodTableName)),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  }
};
