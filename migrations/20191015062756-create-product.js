'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    function getProductModel(stage) {
      return {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
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
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        deleted_at: Sequelize.DATE,
      };
    }
    await Promise.all([
      queryInterface.createTable('dev_product', getProductModel('dev')),
      queryInterface.createTable('prod_product', getProductModel('prod')),
    ]);
    await Promise.all([
      queryInterface.sequelize.query(`ALTER TABLE dev_product ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
      queryInterface.sequelize.query(`ALTER TABLE prod_product ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
      queryInterface.addIndex('dev_product', {
        fields: ['sku'],
        unique: true,
      }),
      queryInterface.addIndex('prod_product', {
        fields: ['sku'],
        unique: true,
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable('dev_product'),
      queryInterface.dropTable('prod_product'),
    ]);
  }
};
