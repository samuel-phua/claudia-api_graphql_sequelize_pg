export const getTimestampColumnsAlterTypeSql = tableName => {
  return `ALTER TABLE ${tableName} ALTER COLUMN created_at TYPE timestamp(0) with time zone, ALTER COLUMN updated_at TYPE timestamp(0) with time zone, ALTER COLUMN deleted_at TYPE timestamp(0) with time zone`
}

export const getModelTimestampColumnFields = Sequelize => {
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
  }
}

export const getModelReferenceField = (stage, tableName, referenceTableId, Sequelize) => {
  const columnName = `${tableName}_${referenceTableId}`
  return {
    columnName: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: `${stage}_${tableName}`,
        key: referenceTableId,
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }
}

export const getModelIdField = (fieldName, Sequelize) => {
  return {
    fieldName: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
    }
  }
}
