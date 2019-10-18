'use strict';
const is = require('is_js');
let utils = require('../bin/utils');
if (is.not.existy(utils)) {
  utils = require('../src/utils');
}
function getProductModel(stage, Sequelize) {
  return {
    ...utils.getModelIdField('id', Sequelize),
    sku: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    display_name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    unit_description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    unit_selling_price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
    },
    ...utils.getModelTimestampColumnFields(Sequelize),
  };
}
const devTableName = 'dev_product';
const prodTableName = 'prod_product';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(devTableName, getProductModel('dev', Sequelize)),
      queryInterface.createTable(prodTableName, getProductModel('prod', Sequelize)),
    ]);
    await Promise.all([
      queryInterface.sequelize.query(utils.getTimestampColumnsAlterTypeSql(devTableName)),
      queryInterface.sequelize.query(utils.getTimestampColumnsAlterTypeSql(prodTableName)),
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
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(devTableName),
      queryInterface.dropTable(prodTableName),
    ]);
  }
};
