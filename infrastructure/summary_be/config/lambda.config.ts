import { Runtime, ILayerVersion } from "aws-cdk-lib/aws-lambda";
import {
  COMPONENTS,
  LAMBDA_NAMES,
  SUMMARY_BE_BASE_DIR,
  SUMMARY_BE_LAMBDA_HANDLERS,
  LayersDir,
  APP_NAME,
} from "./constants";
import * as path from "path";

export interface LayerVersionConfig {
  asset: string;
  compatibleRuntimes: Runtime[];
  layerVersionName: string;
}
export interface LambdaConfig {
  componentName: string;
  functionName: string;
  asset: string;
  handler: string;
  runtime: Runtime;
  layers?: LayerVersionConfig[];
}

export interface ScriptInfo {
  path: string;
  filename: string;
}

const SummaryBEStatus: LambdaConfig = {
  componentName: COMPONENTS.status,
  functionName: APP_NAME + "_" + COMPONENTS.status + LAMBDA_NAMES.function,
  asset: path.join(__dirname, SUMMARY_BE_BASE_DIR),
  handler: COMPONENTS.status + "." + SUMMARY_BE_LAMBDA_HANDLERS.status,
  runtime: Runtime.PYTHON_3_9,
};

const SummaryLayer: LayerVersionConfig = {
  asset: LayersDir[COMPONENTS.summary + "Layer"],
  compatibleRuntimes: [Runtime.PYTHON_3_9],
  layerVersionName: COMPONENTS.summary + "Layer",
};

const Summary: LambdaConfig = {
  componentName: COMPONENTS.summary,
  functionName: APP_NAME + "_" + COMPONENTS.summary + LAMBDA_NAMES.function,
  asset: path.join(__dirname, SUMMARY_BE_BASE_DIR),
  handler: COMPONENTS.summary + "." + SUMMARY_BE_LAMBDA_HANDLERS.summary,
  runtime: Runtime.PYTHON_3_9,
  layers: [SummaryLayer],
};

export const BACKEND_TO_DEPLOY_LAMBDAS: LambdaConfig[] = [
  SummaryBEStatus,
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
