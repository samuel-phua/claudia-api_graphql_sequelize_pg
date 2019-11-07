export const getTimestampColumnsAlterTypeSql = (tableName) => {
  return `ALTER TABLE ${tableName} ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`;
};

export const getAlterTimestampColumnsTypeSql = (tableName, columnNames) => {
  let result = `ALTER TABLE ${tableName} `;
  if (Array.isArray(columnNames) && columnNames.length > 0) {
    result = columnNames.reduce((accumulator, currentValue) => {
      return accumulator += `ALTER COLUMN ${currentValue} TYPE timestamp(0) with time zone, `;
    }, result);
    result = result.substring(0, result.length - 2);
    return result;
  } else return "";
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

const primaryKeyConfig = (isPrimaryKey) => {
  if (isPrimaryKey === true) {
    return { primaryKey: true };
  } else return {};
}

const referencesFieldConfig = (stage, tableName, referenceTableId, migration) => {
  if (migration === true) {
    return {
      references: {
        model: `${stage}_${tableName}`,
        key: referenceTableId,
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    };
  } else {
    return {};
  }
};

export const getModelReferenceField = (stage, tableName, referenceTableId, isPrimaryKey, migration, Sequelize) => {
  const columnName = `${tableName}_${referenceTableId}`;
  let result = {};
  result[columnName] = {
    type: Sequelize.UUID,
    allowNull: false,
    ...primaryKeyConfig(isPrimaryKey),
    ...referencesFieldConfig(stage, tableName, referenceTableId, migration),
  };
  return result;
};

export const getModelReferenceIntegerField = (stage, tableName, referenceTableId, isPrimaryKey, migration, Sequelize) => {
  const columnName = `${tableName}_${referenceTableId}`;
  let result = {};
  result[columnName] = {
    type: Sequelize.INTEGER,
    allowNull: false,
    ...primaryKeyConfig(isPrimaryKey),
    ...referencesFieldConfig(stage, tableName, referenceTableId, migration),
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

export const getModelIdIntegerField = (fieldName, Sequelize) => {
  let result = {};
  result[fieldName] = {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
