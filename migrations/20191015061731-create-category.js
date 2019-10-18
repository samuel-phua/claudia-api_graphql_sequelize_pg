'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    function getCategoryModel(stage) {
      return {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
        display_name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        display_order: {
          type: Sequelize.INTEGER,
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
      queryInterface.createTable('dev_category', getCategoryModel('dev')),
      queryInterface.createTable('prod_category', getCategoryModel('prod')),
    ]);
    await Promise.all([
      queryInterface.sequelize.query(`ALTER TABLE dev_category ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
      queryInterface.sequelize.query(`ALTER TABLE prod_category ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable('dev_category'),
      queryInterface.dropTable('prod_category'),
    ]);
  }
};
