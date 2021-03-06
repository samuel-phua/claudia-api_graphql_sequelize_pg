const env = require('../../env.json');

const devStageName = env.developmentStageName;
const prodStageName = env.productionStageName;
const tableName = env.productTableName;
const devTableName = `${devStageName}_${tableName}`;
const prodTableName = `${prodStageName}_${tableName}`;
const idName = env.idName;
const utils = require('../utils');
const productFields = require('../models/fields/ProductFields');

function getProductModel(stage, Sequelize) {
  return {
    ...utils.getModelIdField(idName, true, Sequelize),
    ...productFields(Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getProductModel(devStageName, Sequelize)),
      queryInterface.createTable(prodTableName, getProductModel(prodStageName, Sequelize)),
    ]);
    const timestampColumnNames = ['created_at', 'updated_at', 'deleted_at'];
    await Promise.all([
      queryInterface.sequelize.query(
        utils.getAlterTimestampColumnsTypeSql(devTableName, timestampColumnNames),
      ),
      queryInterface.sequelize.query(
        utils.getAlterTimestampColumnsTypeSql(prodTableName, timestampColumnNames),
      ),
      queryInterface.addIndex(devTableName, {
        fields: ['sku'],
        unique: true,
      }),
      queryInterface.addIndex(prodTableName, {
        fields: ['sku'],
        unique: true,
      }),
    ]);
  },
  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  },
};
