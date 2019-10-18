'use strict';

let pg = require('pg');
delete pg.native;
const Sequelize = require('sequelize');
const Category = require('./Category');
const Product = require('./Product');
const ProductCategory = require('./ProductCategory');
const modelModules = [
  Category,
  Product,
  ProductCategory,
];

let dbClient = {};

function initClient() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const dbConnStr = process.env[`${nodeEnv}_db_conn_str`];
  const sequelize = new Sequelize(dbConnStr, {
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'claudia-api_graphql_sequelize_boilerplate',
    },
    pool: {
      max: 1,
    },
  });

  modelModules.forEach(modelModule => {
    const model = modelModule(sequelize, Sequelize);
    dbClient[model.name] = model;
  });

  Object.keys(dbClient).forEach(modelName => {
    if (dbClient[modelName].associate) {
      dbClient[modelName].associate(dbClient);
    }
  });

  dbClient.sequelize = sequelize;
  dbClient.Sequelize = Sequelize;
  dbClient.Op = Sequelize.Op;

  return dbClient;
}

function getClient() {
  return dbClient;
}

async function disconnect() {
  await dbClient.sequelize.close();
}

module.exports = {
  initClient,
  getClient,
  disconnect,
};
