import ApiBuilder from 'claudia-api-builder';
import { graphql } from 'graphql';
import log from 'lambda-log';
import schema from './schema';
import init from './models';
import { getContext, getContextForLog } from './utils';

const api = new ApiBuilder();

const getRegisterAuthorizerOptions = (lambdaName) => {
  return {
    lambdaName,
    lambdaVersion: false,
    credentials: 'arn:aws:iam::XXXXXXXXXXXX:role/Auth0Integration',
    type: 'TOKEN',
    headerName: 'Authorization',
    validationExpression: '^Bearer [-0-9a-zA-z.]*$',
    resultTtl: 3600,
  };
};

api.registerAuthorizer(
  'adminCustomAuthorizer',
  getRegisterAuthorizerOptions('adminJwtRsaCustomAuthorizer'),
);

// override default access-control-allow-origin headers
api.corsHeaders('Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Api-Version');

// define a global function that returns an allowed cors origin
// this will be used for the OPTIONS access-control-allow-origin response header
// api.corsOrigin((request) => {
//   log.info("got cors request", JSON.stringify(request));
//   if (/example.com$/.test(request.normalizeHeaders.origin)) {
//     return request.normalizeHeaders.origin;
//   }
//   return "";
// });

// cors headers will automatically be added to all requests
api.get('/', (request) => {
  const context = request.lambdaContext;
  const alias = context.invokedFunctionArn.replace(/.*:/g, '');
  log.info(`alias: ${alias} version: ${context.functionVersion}`);
  return 'hello world';
});

// you can customise individual responses as well
// api.get("/programmatic-headers", () => {
//   return new api.ApiResponse("OK", {
//     "Access-Control-Allow-Origin": "https://www.example.com",
//   });
// }, {
//   success: {
//     headers: ["Access-Control-Allow-Origin"]
//   }
// });

const getResponse = async (request, applicationName) => {
  // request.body is the GraphQL query string. It must exist
  if (typeof request.body !== 'string') {
    return 'POST body must be a string';
  }
  const db = await init(request.context.stage);
  const context = getContext(db, request, applicationName);
  log.info('inside graphql', {
    ...getContextForLog(context),
    request: request.body,
  });
  const response = await graphql(schema, request.body, null, context);
  log.info('graphql response', {
    ...getContextForLog(context),
    response,
  });
  await db.end();
  return response;
};

api.post(
  '/graphql',
  async (request) => {
    return getResponse(request, 'admin');
  },
  { customAuthorizer: 'adminCustomAuthorizer' },
);

export default api;
