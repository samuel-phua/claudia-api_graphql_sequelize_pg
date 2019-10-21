export const getContext = (context) => {
  return {
    // nodeEnvironment: process.env.NODE_ENV,
    apiGatewayMethod: context.apiGatewayContext.method,
    apiGatewayStage: context.apiGatewayContext.stage,
    apiGatewaySourceIP: context.apiGatewayContext.sourceIp,
    apiGatewayAccountId: context.apiGatewayContext.accountId,
    apiGatewayUserId: context.apiGatewayContext.user,
    apiGatewayUserAgent: context.apiGatewayContext.userAgent,
    apiGatewayUserArn: context.apiGatewayContext.userArn,
    apiGatewayCaller: context.apiGatewayContext.caller,
    apiGatewayApiKey: context.apiGatewayContext.apiKey,
    lambdaFunctionName: context.lambdaContext.functionName,
    lambdaFunctionVersion: context.lambdaContext.functionVersion,
    lambdaInvokedFunctionArn: context.lambdaContext.invokedFunctionArn,
    lambdaMemoryAllocated: context.lambdaContext.memoryLimitInMB,
    lambdaRemainingTime: context.lambdaContext.getRemainingTimeInMillis(),
  };
};

export const mockContext = (db) => {
  return {
    pg: db,
    env: {},
    apiGatewayContext: {
      method: null,
      stage: null,
      sourceIp: null,
      accountId: null,
      user: null,
      userAgent: null,
      userArn: null,
      caller: null,
      apiKey: null,
    },
    lambdaContext: {
      functionName: null,
      functionVersion: null,
      invokedFunctionArn: null,
      memoryLimitInMB: null,
      getRemainingTimeInMillis: () => { return null; },
    },
  };
};
