export const getTimestampColumnsAlterTypeSql = (tableName) => {
  return `ALTER TABLE ${tableName} ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`;
};

export const getModelTimestampColumnFields = (Sequelize) => {
  return {
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    deleted_at: Sequelize.DATE,
  };
};

export const getModelReferenceField = (stage, tableName, referenceTableId, Sequelize) => {
  const columnName = `${tableName}_${referenceTableId}`;
  let result = {};
  result[columnName] = {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: `${stage}_${tableName}`,
      key: referenceTableId,
    },
    onUpdate: "cascade",
    onDelete: "cascade",
  };
  return result;
};

const defaultValueFieldConfig = (migration, Sequelize) => {
  if (migration === true) {
    return {
      defaultValue: Sequelize.fn("uuid_generate_v4")
    };
  } else {
    return {};
  }
};

export const getModelIdField = (fieldName, migration, Sequelize) => {
  let result = {};
  result[fieldName] = {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    ...defaultValueFieldConfig(migration, Sequelize),
  };
  return result;
};

export const getModelConfig = (tableName) => {
  return {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName,
  };
};
