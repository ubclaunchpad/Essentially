import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { getKeywordsFromText } from "./utils/keyword";
import { CORS_HEADER } from "./constants";

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.text) {
      return {
        statusCode: 400,
        headers: CORS_HEADER,
        body: JSON.stringify(
          "Invalid Request - Please supply some text extract keywords from."
        ),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: JSON.stringify(getKeywordsFromText(body.text, body.numOfKeywords)),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      headers: CORS_HEADER,
      body: JSON.stringify({ message: e.message }),
    };
  }
};
