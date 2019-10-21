import ApiBuilder from "claudia-api-builder"
import { graphql } from "graphql"
import schema from "./schema"
import db from "./models"
import log from "lambda-log"

const api = new ApiBuilder

// override default access-control-allow-origin headers
api.corsHeaders("Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Api-Version")

// define a global function that returns an allowed cors origin
// this will be used for the OPTIONS access-control-allow-origin response header
api.corsOrigin((request) => {
  console.info("got cors request", JSON.stringify(request))
  if (/example.com$/.test(request.normalizeHeaders.origin)) {
    return request.normalizeHeaders.origin
  }
  return ""
})

// cors headers will automatically be added to all requests
api.get("/", request => {
  const context = request.lambdaContext
  const alias = context.invokedFunctionArn.replace(/.*:/g, '')
  console.info(`alias: ${alias} version: ${context.functionVersion}`)
  return "hello world"
})

// you can customise individual responses as well
api.get("/programmatic-headers", () => {
  return new api.ApiResponse("OK", {
    "Access-Control-Allow-Origin": "https://www.example.com",
  })
}, {
  success: {
    headers: ["Access-Control-Allow-Origin"]
  }
})

api.post("/graphql", async request => {
  // request.body is the GraphQL query string. It must exist
  if (typeof request.body !== "string") {
    return "POST body must be a string"
  }

  db.initClient()

  let context = {
    pg: db.getClient(),
    env: request.env,
    lambdaContext: request.lambdaContext,
    apiGatewayContext: request.context,
  }

  const response = await graphql(schema, request.body, null, context)

  await db.disconnect()
  return response
})

export default api
