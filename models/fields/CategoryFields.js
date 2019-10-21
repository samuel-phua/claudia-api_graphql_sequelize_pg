export default (Sequelize) => {
  return {
    display_name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    display_order: {
      type: Sequelize.INTEGER,
    },
  };
};
