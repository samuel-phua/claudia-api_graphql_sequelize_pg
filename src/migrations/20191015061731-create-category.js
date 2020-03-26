"use strict";
const is = require("is_js");
const env = require("../env.json");
const devStageName = env.developmentStageName;
const prodStageName = env.productionStageName;
const tableName = env.categoryTableName;
const devTableName = `${devStageName}_${tableName}`;
const prodTableName = `${prodStageName}_${tableName}`;
const idName = env.idName;

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
    ...utils.getModelIdField(idName, true, Sequelize),
    ...categoryFields(Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getCategoryModel(devStageName, Sequelize)),
      queryInterface.createTable(prodTableName, getCategoryModel(prodStageName, Sequelize)),
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
