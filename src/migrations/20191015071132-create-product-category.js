const env = require('../../env.json');

const devStageName = env.developmentStageName;
const prodStageName = env.productionStageName;
const tableName = env.productCategoryTableName;
const devTableName = `${devStageName}_${tableName}`;
const prodTableName = `${prodStageName}_${tableName}`;
const idName = env.idName;
const utils = require('../utils');

function getProductCategoryModel(stage, Sequelize) {
  return {
    ...utils.getModelReferenceField(stage, env.productTableName, idName, true, true, Sequelize),
    ...utils.getModelReferenceField(stage, env.categoryTableName, idName, true, true, Sequelize),
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getProductCategoryModel(devStageName, Sequelize)),
      queryInterface.createTable(prodTableName, getProductCategoryModel(prodStageName, Sequelize)),
    ]);
    const timestampColumnNames = ['created_at', 'updated_at', 'deleted_at'];
    await Promise.all([
      queryInterface.sequelize.query(
        utils.getAlterTimestampColumnsTypeSql(devTableName, timestampColumnNames),
      ),
      queryInterface.sequelize.query(
        utils.getAlterTimestampColumnsTypeSql(prodTableName, timestampColumnNames),
      ),
    ]);
  },
  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  },
};
