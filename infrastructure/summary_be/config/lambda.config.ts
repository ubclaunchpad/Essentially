import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  COMPONENTS,
  LAMBDA_NAMES,
  SUMMARY_BE_BASE_DIR,
  SUMMARY_BE_LAMBDA_HANDLERS,
} from "./constants";
import * as path from "path";
export interface LambdaConfig {
  componentName: string;
  functionName: string;
  asset: string;
  handler: string;
  runtime: Runtime;
}

const BackendStatus: LambdaConfig = {
  componentName: COMPONENTS.status,
  functionName: COMPONENTS.status + LAMBDA_NAMES.function,
  asset: path.join(__dirname, SUMMARY_BE_BASE_DIR),
  handler: COMPONENTS.status + "." + SUMMARY_BE_LAMBDA_HANDLERS.status,
  runtime: Runtime.PYTHON_3_9,
};

const Summary: LambdaConfig = {
  componentName: COMPONENTS.summary,
  functionName: COMPONENTS.summary + LAMBDA_NAMES.function,
  asset: path.join(__dirname, SUMMARY_BE_BASE_DIR),
  handler: COMPONENTS.summary + "." + SUMMARY_BE_LAMBDA_HANDLERS.summary,
  runtime: Runtime.PYTHON_3_9,
};

export const BACKEND_TO_DEPLOY_LAMBDAS: LambdaConfig[] = [
  BackendStatus,
  Summary,
];

export const COMPONENT_TO_LAMBDA_CONFIG: Record<string, LambdaConfig> =
  BACKEND_TO_DEPLOY_LAMBDAS.reduce(
    (record: Record<string, LambdaConfig>, config: LambdaConfig) => {
      record[config.componentName as string] = config;
      return record;
    },
    {} as Record<string, LambdaConfig>
  );
