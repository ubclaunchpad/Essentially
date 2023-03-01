// import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
// import { Lambda } from "aws-sdk"
// import { ISummarizationData } from "./interface";
//
// const lambda = new Lambda();
//
// export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
//   try {
//     console.log('summary route called')
//     const body = JSON.parse(event.body)
//     console.log('body', body)
//
//     if (!body || !body.content || !body.length) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify("Invalid Request - Please supply some text and length to summarize.")
//       }
//     }
//     
//     const response = await lambda.invoke({
//       FunctionName: 'test-lambda',
//       InvocationType: 'RequestResponse',
//       Payload: JSON.stringify({
//         content: {
//           text: body.content,
//         },
//         length: body.length,
//       })
//     }).promise()
//
//     console.log('response', response)
//
//     // const payload = response.Payload
//     // 
//     // if (response.StatusCode === 200) {
//     //     return {
//     //         statusCode: 200,
//     //         body: JSON.stringify({ summarized_text: response.Payload.summarized_text, message: response.Payload.valueOf })
//     //     }
//     // } else {
//     //     return {
//     //         statusCode: response.StatusCode || 500,
//     //         body: JSON.stringify("Essentially is active but Summary API is down :(")
//     //     }
//     // }
//     // 
//   } catch {
//     return {
//       statusCode: 500,
//       body: JSON.stringify("Essentially is active but Summary API is down :(")
//     }
//   }
// };
