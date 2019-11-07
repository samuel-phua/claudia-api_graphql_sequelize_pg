"use strict";
const is = require("is_js");
let utils = require("../bin/utils");
if (is.not.existy(utils)) {
  utils = require("../src/utils");
}
let productFields = require("../bin/models/fields/ProductFields");
if (is.not.existy(productFields)) {
  productFields = require("../src/models/fields/ProductFields");
}
function getProductModel(stage, Sequelize) {
  return {
    ...utils.getModelIdField("id", true, Sequelize),
    ...productFields(Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}
const devTableName = "dev_product";
const prodTableName = "prod_product";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getProductModel("dev", Sequelize)),
      queryInterface.createTable(prodTableName, getProductModel("prod", Sequelize)),
    ]);
    const timestampColumnNames = ["created_at", "updated_at", "deleted_at"];
    await Promise.all([
      queryInterface.sequelize.query(utils.getAlterTimestampColumnsTypeSql(devTableName, timestampColumnNames)),
      queryInterface.sequelize.query(utils.getAlterTimestampColumnsTypeSql(prodTableName, timestampColumnNames)),
      queryInterface.addIndex(devTableName, {
        fields: ["sku"],
        unique: true,
      }),
      queryInterface.addIndex(prodTableName, {
        fields: ["sku"],
        unique: true,
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  }
};
