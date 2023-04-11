import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { Lambda, S3 } from "aws-sdk";
import { CORS_HEADER, SUMMARY_S3_BASE_DOMAIN } from "./constants";

const lambda = new Lambda();
const s3 = new S3();

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    body = event.body;
  }

  if (!body || !body.content || !body.length || !body.summaryId) {
    return {
      statusCode: 400,
      headers: CORS_HEADER,
      body: JSON.stringify(
        `Invalid Request: ${body.summaryId} - Please supply some text and length to summarize.`
      ),
    };
  }

  const response = await lambda
    .invoke({
      FunctionName: "Essentially-Summary-BE-summaryfunction",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({
        content: {
          text: body.content,
        },
        length: body.length,
      }),
    })
    .promise();

  const payload = JSON.parse(response.Payload.toString());
  const status = payload.statusCode;

  if (status === 200) {
    await s3
      .putObject({
        Bucket:
          "essentially-backend-s3st-essentiallybackendtestbu-1e6w7ixe3uqi0",
        Key: body.summaryId.concat("/summary.json"),
        Body: JSON.stringify({
          summarized_text: payload.summarized_text,
          meta: payload.Meta,
        }),
        ContentType: "application/json",
      })
      .promise();
    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: `Summary generated for request: ${body.summaryId} is ready at ${SUMMARY_S3_BASE_DOMAIN}/${body.summaryId}/summary.json`,
    };
  } else {
    return {
      statusCode: 500,
      headers: CORS_HEADER,
      body: JSON.stringify(
        "Essentially is active but the Summary API is down :("
      ),
    };
  }
};
