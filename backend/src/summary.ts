import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Lambda } from "aws-sdk"
import { ISummarizationData } from "./interface";

const lambda = new Lambda();

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body)

    if (!body || !body.content || !body.length) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid Request - Please supply some text and length to summarize.")
      }
    }
    
    const response = await lambda.invoke({
      FunctionName: 'Essentially-Summary-BE-summaryfunction',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        content: {
          text: body.content,
        },
        length: body.length,
      })
    }).promise()

    const payload = JSON.parse(response.Payload.toString())

    const status = payload.statusCode

    if (status === 200) {
        return {
            statusCode: 200,
            body: JSON.stringify({ summarized_text: payload.summarized_text, meta: payload.Meta })
        }
    } else {
        return {
            statusCode: status || 500,
            body: payload.message 
        }
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify("Essentially is active but the Summary API is down :(")
    }
  }
};
