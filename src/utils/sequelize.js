import is from 'is_js';

export const getTimestampColumnsAlterTypeSql = (tableName) => {
  return `ALTER TABLE ${tableName} ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`;
};

export const getAlterTimestampColumnsTypeSql = (tableName, columnNames) => {
  let result = `ALTER TABLE ${tableName} `;
  if (Array.isArray(columnNames) && columnNames.length > 0) {
    result = columnNames.reduce((accumulator, currentValue) => {
      accumulator += `ALTER COLUMN ${currentValue} TYPE timestamp(0) with time zone, `;
      return accumulator;
    }, result);
    result = result.substring(0, result.length - 2);
    return result;
  }
  return '';
};

export const getModelTimestampColumnFields = (Sequelize) => {
  return {
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
};

const primaryKeyConfig = (isPrimaryKey) => {
  if (isPrimaryKey === true) {
    return { primaryKey: true };
  }
  return {};
};

const referencesFieldConfig = (stage, tableName, referenceTableId, migration) => {
  if (migration === true) {
    return {
      references: {
        model: `${stage}_${tableName}`,
        key: referenceTableId,
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    };
  }
  return {};
};

export const getModelReferenceField = (
  stage,
  tableName,
  referenceTableId,
  isPrimaryKey,
  migration,
  Sequelize,
) => {
  const columnName = `${tableName}_${referenceTableId}`;
  const result = {};
  result[columnName] = {
    type: Sequelize.UUID,
    allowNull: false,
    ...primaryKeyConfig(isPrimaryKey),
    ...referencesFieldConfig(stage, tableName, referenceTableId, migration),
  };
  return result;
};

export const getModelReferenceIntegerField = (
  stage,
  tableName,
  referenceTableId,
  isPrimaryKey,
  migration,
  Sequelize,
) => {
  const columnName = `${tableName}_${referenceTableId}`;
  const result = {};
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
      defaultValue: Sequelize.fn('uuid_generate_v4'),
    };
  }
  return {};
};

export const getModelIdField = (fieldName, migration, Sequelize) => {
  const result = {};
  result[fieldName] = {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    ...defaultValueFieldConfig(migration, Sequelize),
  };
  return result;
};

export const getModelIdIntegerField = (fieldName, Sequelize) => {
  const result = {};
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

export const getSingleRowFromModelUpdate = (result) => {
  if (
    is.array(result) &&
    result.length === 2 &&
    is.number(result[0]) &&
    result[0] === 1 &&
    is.array(result[1]) &&
    result[1].length === 1
  ) {
    return result[1][0];
  }
  return null;
};
