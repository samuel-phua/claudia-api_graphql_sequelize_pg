'use strict';
module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const productTableName = process.env[`${nodeEnv}_product_tbl_name`];
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    sku: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unit_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unit_selling_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: productTableName,
  });
  Product.associate = function(models) {
    models.Product.hasMany(models.ProductCategory, {
      foreignKey: 'product_id',
      sourceKey: 'id',
    });
  };
  return Product;
};
