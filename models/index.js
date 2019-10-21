import pg from "pg";
delete pg.native;
import Sequelize from "sequelize";
import Category from "./Category";
import Product from "./Product";
import ProductCategory from "./ProductCategory";
const modelModules = [
  Category,
  Product,
  ProductCategory,
];
const nodeEnv = process.env.NODE_ENV || "development";
const dbConnStr = process.env[`${nodeEnv}_db_conn_str`];

let dbClient = {};

const initClient = () => {
  const sequelize = new Sequelize(dbConnStr, {
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      application_name: "claudia-api_graphql_sequelize_boilerplate",
    },
    pool: {
      max: 1,
    },
  });

  modelModules.forEach((modelModule) => {
    const model = modelModule(sequelize, Sequelize);
    dbClient[model.name] = model;
  });

  Object.keys(dbClient).forEach((key) => {
    const modelName = key;
    const model = dbClient[modelName];
    if (model.associate) {
      model.associate(dbClient);
    }
  });

  dbClient.sequelize = sequelize;
  dbClient.Sequelize = Sequelize;
  dbClient.Op = Sequelize.Op;

  return dbClient;
};

const getClient = () => {
  return dbClient;
};

const disconnect = async () => {
  await dbClient.sequelize.close();
};

module.exports = {
  initClient,
  getClient,
  disconnect,
};
