import {Runtime}  from "aws-cdk-lib/aws-lambda";
import { COMPONENTS, LAMBDA_NAMES } from "./constants";
import * as path from 'path';

export interface LambdaConfig {
  componentName: string;
  functionName: string;
  asset: string;
  handler: string;
  runtime: Runtime;
  resources?: string[];
}

export const BACKEND_LAMBDA_ASSET_PATH = path.join(__dirname, '/../../../backend/dist');
export const BACKEND_STATUS_LAMBDA_HANDLER = "status.handler";
export const BACKEND_KEYWORD_LAMBDA_HANDLER = "keyword.handler";
export const BACKEND_SUMMARY_LAMBDA_HANDLER = "summary.handler";

const BackendStatus: LambdaConfig = {
  componentName: COMPONENTS.status,
  functionName: COMPONENTS.status + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_STATUS_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X,
  resources: ['arn:aws:lambda:us-west-2:528952773195:function:Essentially-Summary-BE-statusfunction']
}

const Summary: LambdaConfig = {
  componentName: COMPONENTS.summary,
  functionName: COMPONENTS.summary + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_SUMMARY_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X,
  resources: ['arn:aws:lambda:us-west-2:528952773195:function:Essentially-Summary-BE-summaryfunction']
}

const Keyword: LambdaConfig = {
  componentName: COMPONENTS.keyword,
  functionName: COMPONENTS.keyword + LAMBDA_NAMES.function,
  asset: BACKEND_LAMBDA_ASSET_PATH,
  handler: BACKEND_KEYWORD_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X
}

export const BACKEND_TO_DEPLOY_LAMBDAS: LambdaConfig[] = [BackendStatus, Summary, Keyword];

export const COMPONENT_TO_LAMBDA_CONFIG: Record<string, LambdaConfig> = BACKEND_TO_DEPLOY_LAMBDAS.reduce((record: Record<string, LambdaConfig>, config: LambdaConfig) => {
  record[config.componentName as string] = config;
  return record;
}, {} as Record<string, LambdaConfig>);
