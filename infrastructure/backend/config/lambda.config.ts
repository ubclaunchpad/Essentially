import {Runtime}  from "aws-cdk-lib/aws-lambda";
import { COMPONENTS, LAMBDA_NAMES } from "./constants";
import * as path from 'path';
import { Duration } from "aws-cdk-lib";

export interface LambdaConfig {
  componentName: string;
  functionName: string;
  asset: string;
  handler: string;
  runtime: Runtime;
  timeout?: Duration;
  lambdaResources?: string[];
  s3Resources?: string[];
}

export const BACKEND_LAMBDA_ASSET_PATH = path.join(__dirname, '/../../../backend/dist');
export const BACKEND_STATUS_LAMBDA_HANDLER = "status.handler";
export const BACKEND_KEYWORD_LAMBDA_HANDLER = "keyword.handler";
export const BACKEND_SUMMARY_LAMBDA_HANDLER = "summary.handler";
export const BACKEND_SUMMARY_REQUEST_LAMBDA_HANDLER = "summaryRequest.handler";


const BackendStatus: LambdaConfig = {
  componentName: COMPONENTS.status,
  functionName: COMPONENTS.status + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_STATUS_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X,
  lambdaResources: ['arn:aws:lambda:us-west-2:528952773195:function:Essentially-Summary-BE-statusfunction']
}

const Summary: LambdaConfig = {
  componentName: COMPONENTS.summary,
  functionName: COMPONENTS.summary + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_SUMMARY_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X,
  timeout: Duration.minutes(15),
  lambdaResources: ['arn:aws:lambda:us-west-2:528952773195:function:Essentially-Summary-BE-summaryfunction'],
  s3Resources: ['arn:aws:s3:::essentially-backend-s3st-essentiallybackendtestbu-1e6w7ixe3uqi0', 'arn:aws:s3:::essentially-backend-s3st-essentiallybackendtestbu-1e6w7ixe3uqi0/*']
}

const Keyword: LambdaConfig = {
  componentName: COMPONENTS.keyword,
  functionName: COMPONENTS.keyword + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_KEYWORD_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X
}

const SummaryRequest: LambdaConfig = {
  componentName: COMPONENTS.summaryRequest,
  functionName: COMPONENTS.summaryRequest + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_SUMMARY_REQUEST_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X,
  lambdaResources: ['arn:aws:lambda:us-west-2:528952773195:function:summaryfunction']
}

export const BACKEND_TO_DEPLOY_LAMBDAS: LambdaConfig[] = [BackendStatus, Summary, Keyword, SummaryRequest];

export const COMPONENT_TO_LAMBDA_CONFIG: Record<string, LambdaConfig> = BACKEND_TO_DEPLOY_LAMBDAS.reduce((record: Record<string, LambdaConfig>, config: LambdaConfig) => {
  record[config.componentName as string] = config;
  return record;
}, {} as Record<string, LambdaConfig>);
