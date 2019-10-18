'use strict';
module.exports = (sequelize, DataTypes) => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const categoryTableName = process.env[`${nodeEnv}_category_tbl_name`];
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    display_order: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: categoryTableName,
  });
  Category.associate = function(models) {
    models.Category.hasMany(models.ProductCategory, {
      foreignKey: 'category_id',
      sourceKey: 'id',
    });
  };
  return Category;
};
