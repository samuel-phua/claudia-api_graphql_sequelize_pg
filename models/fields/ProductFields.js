export default Sequelize => {
  return {
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
  }
}
