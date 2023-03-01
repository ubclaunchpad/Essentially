import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Lambda } from "aws-sdk"

const lambda = new Lambda();

export const handler = async (_event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const response = await lambda.invoke({
      FunctionName: 'test-lambda',
      InvocationType: 'RequestResponse',
    }).promise()

    console.log('response', response)

    const { StatusCode: status } = response
    
    console.log('response', status)

    if (status === 200) {
        return {
            statusCode: 200,
            body: "Everything is essentially running :)"
        }
    } else {
        return {
            statusCode: status || 500,
            body: "Essentially is active but Summary API is down :("
        }
    }
  } catch {
    return {
      statusCode: 500,
      body: "Essentially is active but Summary API is down :("
    }
  }
};
