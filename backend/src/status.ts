import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Lambda } from "aws-sdk"

const lambda = new Lambda();

export const handler = async (_event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const response = await lambda.invoke({
      FunctionName: 'Essentially-Summary-BE-statusfunction',
      InvocationType: 'RequestResponse',
    }).promise()

    const payload = JSON.parse(response.Payload.toString())

    const status = payload.statusCode

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
      body: "Essentially is down :("
    }
  }
};
