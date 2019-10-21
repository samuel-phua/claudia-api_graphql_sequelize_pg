export const getLogContext = (context) => {
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
