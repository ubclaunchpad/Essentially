import {Runtime}  from "aws-cdk-lib/aws-lambda";
import { COMPONENTS, LAMBDA_NAMES } from "./constants";

export interface LambdaConfig {
  componentName: string;
  functionName: string;
  asset: string;
  handler: string;
  runtime: Runtime;
}

export const BACKEND_SAMPLE_LAMBDA_ASSET_PATH = "resources";
export const BACKEND_SAMPLE_LAMBDA_HANDLER = "sample_lambda.main";

const BackendStatus: LambdaConfig = {
  componentName: COMPONENTS.status,
  functionName: COMPONENTS.status + LAMBDA_NAMES.function,
  asset: BACKEND_SAMPLE_LAMBDA_ASSET_PATH,
  handler: BACKEND_SAMPLE_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X
}

const Summary: LambdaConfig = {
  componentName: COMPONENTS.summary,
  functionName: COMPONENTS.summary + LAMBDA_NAMES.function,
  asset: BACKEND_SAMPLE_LAMBDA_ASSET_PATH,
  handler: BACKEND_SAMPLE_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X
}

const Keyword: LambdaConfig = {
  componentName: COMPONENTS.keyword,
  functionName: COMPONENTS.keyword + LAMBDA_NAMES.function,
  asset: BACKEND_SAMPLE_LAMBDA_ASSET_PATH,
  handler: BACKEND_SAMPLE_LAMBDA_HANDLER,
  runtime: Runtime.NODEJS_14_X
}

export const BACKEND_TO_DEPLOY_LAMBDAS: LambdaConfig[] = [BackendStatus, Summary, Keyword];

export const COMPONENT_TO_LAMBDA_CONFIG: Record<string, LambdaConfig> = BACKEND_TO_DEPLOY_LAMBDAS.reduce((record: Record<string, LambdaConfig>, config: LambdaConfig) => {
  record[config.componentName as string] = config;
  return record;
}, {} as Record<string, LambdaConfig>);
