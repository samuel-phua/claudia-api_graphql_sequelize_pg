export const getContext = (db, request, applicationName) => {
  return {
    pg: db,
    env: request.env,
    apiGatewayContext: request.context,
    authorizer: request.context.authorizer,
    lambdaContext: request.lambdaContext,
    applicationName,
  };
};

export const getContextForLog = (context) => {
  return {
    applicationName: context.applicationName,
    apiGatewayMethod: context.apiGatewayContext.method,
    apiGatewayStage: context.apiGatewayContext.stage,
    apiGatewaySourceIP: context.apiGatewayContext.sourceIp,
    apiGatewayAccountId: context.apiGatewayContext.accountId,
    apiGatewayUserId: context.apiGatewayContext.user,
    apiGatewayUserAgent: context.apiGatewayContext.userAgent,
    apiGatewayUserArn: context.apiGatewayContext.userArn,
    apiGatewayCaller: context.apiGatewayContext.caller,
    apiGatewayApiKey: context.apiGatewayContext.apiKey,
    authorizerPrincipalId: context.authorizer.principalId,
    authorizerContextScope: context.authorizer.scope,
    authorizerContextNickname: context.authorizer.nickname,
    authorizerContextEmail: context.authorizer.email,
    authorizerContextPhone: context.authorizer.phone,
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
    authorizer: {
      principalId: null,
      scope: null,
      nickname: null,
      email: null,
      phone: null,
    },
    lambdaContext: {
      functionName: null,
      functionVersion: null,
      invokedFunctionArn: null,
      memoryLimitInMB: null,
      getRemainingTimeInMillis: () => {
        return null;
      },
    },
    applicationName: null,
  };
};
