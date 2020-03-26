import pg from 'pg';
import Sequelize from 'sequelize';
import Product from './Product';
import Category from './Category';
import ProductCategory from './ProductCategory';

delete pg.native;
const modelModules = [Product, Category, ProductCategory];

const init = async () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const dbConnStr = process.env[`${nodeEnv}DbConnectionString`];
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
  await sequelize.authenticate();

  const dbClient = modelModules.reduce((accumulator, currentModule) => {
    const model = currentModule(sequelize, Sequelize);
    accumulator[model.name] = model;
    return accumulator;
  }, {});

  Object.keys(dbClient).map((modelName) => {
    const model = dbClient[modelName];
    if (model.associate) {
      model.associate(dbClient);
    }
    return modelName;
  });

  dbClient.sequelize = sequelize;
  dbClient.Sequelize = Sequelize;
  dbClient.Op = Sequelize.Op;
  dbClient.end = async () => {
    await dbClient.sequelize.close();
  };

  return dbClient;
};

export default init;
