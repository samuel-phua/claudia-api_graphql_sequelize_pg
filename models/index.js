import pg from "pg";
delete pg.native;
import Sequelize from "sequelize";
import Product from "./Product";
import Category from "./Category";
import ProductCategory from "./ProductCategory";
const modelModules = [
  Product,
  Category,
  ProductCategory,
];

const init = async () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const dbConnStr = process.env[`${nodeEnv}DbConnectionString`];
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
  await sequelize.authenticate();

  let dbClient = modelModules.reduce((accumulator, currentModule) => {
    const model = currentModule(sequelize, Sequelize);
    accumulator[model.name] = model;
    return accumulator;
  }, {});

  Object.keys(dbClient).map((modelName) => {
    const model = dbClient[modelName];
    if (model.associate) {
      model.associate(dbClient);
    }
  });

  dbClient.sequelize = sequelize;
  dbClient.Sequelize = Sequelize;
  dbClient.Op = Sequelize.Op;
  dbClient.end = async () => await dbClient.sequelize.close();

  return dbClient;
};

module.exports = {
  init,
};
