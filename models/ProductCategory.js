'use strict';
module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const productCategoryTableName = process.env[`${nodeEnv}_product_category_tbl_name`];
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    category_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: productCategoryTableName,
  });
  ProductCategory.associate = function(models) {
    models.ProductCategory.belongsTo(models.Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
    });
    models.ProductCategory.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
  };
  return ProductCategory;
};
