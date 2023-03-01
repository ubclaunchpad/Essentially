import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { getKeywordsFromText } from "./utils/keyword";

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    console.log('keyword route called')
    const body = JSON.parse(event.body)
    console.log('body', body)

    if (!body || !body.text) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid Request - Please supply some text extract keywords from.")
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(getKeywordsFromText(body.text, body.numOfKeywords))
    }
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message })
    }
  }
};
