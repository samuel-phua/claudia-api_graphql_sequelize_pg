'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    function getProductCategoryModel(stage) {
      return {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
        category_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: `${stage}_category`,
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        product_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: `${stage}_product`,
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
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
      queryInterface.createTable('dev_product_category', getProductCategoryModel('dev')),
      queryInterface.createTable('prod_product_category', getProductCategoryModel('prod')),
    ]);
    await Promise.all([
      queryInterface.sequelize.query(`ALTER TABLE dev_product_category ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
      queryInterface.sequelize.query(`ALTER TABLE prod_product_category ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable('dev_product_category'),
      queryInterface.dropTable('prod_product_category'),
    ]);
  }
};
