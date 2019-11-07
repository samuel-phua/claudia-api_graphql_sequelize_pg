"use strict";
const is = require("is_js");
let utils = require("../bin/utils");
if (is.not.existy(utils)) {
  utils = require("../src/utils");
}
let categoryFields = require("../bin/models/fields/CategoryFields");
if (is.not.existy(categoryFields)) {
  categoryFields = require("../src/models/fields/CategoryFields");
}
function getCategoryModel(stage, Sequelize) {
  return {
    ...utils.getModelIdField("id", true, Sequelize),
    ...categoryFields(Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}
const devTableName = "dev_category";
const prodTableName = "prod_category";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getCategoryModel("dev", Sequelize)),
      queryInterface.createTable(prodTableName, getCategoryModel("prod", Sequelize)),
    ]);
    const timestampColumnNames = ["created_at", "updated_at", "deleted_at"];
    await Promise.all([
      queryInterface.sequelize.query(utils.getAlterTimestampColumnsTypeSql(devTableName, timestampColumnNames)),
      queryInterface.sequelize.query(utils.getAlterTimestampColumnsTypeSql(prodTableName, timestampColumnNames)),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  }
};
