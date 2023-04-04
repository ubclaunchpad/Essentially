import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { Lambda } from "aws-sdk";
import { CORS_HEADER } from "./constants";

const lambda = new Lambda();

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.content || !body.length || !body.summaryId) {
      return {
        statusCode: 400,
        headers: CORS_HEADER,
        body: JSON.stringify(
          "Invalid Request - Please supply some text and length to summarize."
        ),
      };
    }

    const params = {
      FunctionName: "summaryfunction",
      InvocationType: "Event",
      Payload: JSON.stringify({
        body: {
          content: body.content,
          length: body.length,
          summaryId: body.summaryId,
        },
      }),
    };

    const invocationResult = await lambda.invoke(params).promise();

    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: JSON.stringify({
        summaryPath: `https://essentially-backend-s3st-essentiallybackendtestbu-1e6w7ixe3uqi0.s3.us-west-2.amazonaws.com/${body.summaryId}/summary.json`,
      }),
    };
  } catch {
    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: "Error invoking Summary Lambda",
    };
  }
};
