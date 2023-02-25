import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import { DeploymentTarget } from "../config/deployment";
import {
  Function,
  Code,
  LayerVersion,
  ILayerVersion,
} from "aws-cdk-lib/aws-lambda";
import { APP_NAME, RESOURCE_ID } from "../config/constants";
import { Construct } from "constructs";
import {
  BACKEND_TO_DEPLOY_LAMBDAS,
  LambdaConfig,
  LayerVersionConfig,
} from "../config/lambda.config";
import { LayerNamesToScripts } from "../config/constants";
import { chdir } from "process";
import { exec } from "child_process";

interface EssentiallySummaryBackendLambdaStackProps extends StackProps {
  target: DeploymentTarget;
}

export const ESSENTIALLY_SUMMARY_BE_LAMBDA_STACK_NAME =
  APP_NAME.PREFIX.concat("LambdaStack");

export class EssentiallySummaryBackendLambdaStack extends cdk.Stack {
  public lambdas: Record<string, Function>;

  constructor(
    scope: Construct,
    id: string,
    props: EssentiallySummaryBackendLambdaStackProps
  ) {
    super(scope, id, props);

    for (const config of BACKEND_TO_DEPLOY_LAMBDAS) {
      const layers: ILayerVersion[] = [];
      if (config.layers) {
        config.layers.forEach((layer: LayerVersionConfig) => {
          layers.push(createLambdaLayer(this, layer));
        });
      }
      createLambdaFunction(this, config, layers);
    }
  }
}

function createLambdaLayer(scope: Construct, props: LayerVersionConfig) {
  const { path, filename } = LayerNamesToScripts[props.layerVersionName];
  chdir(path);
  exec("python " + filename, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  return new LayerVersion(scope, props.layerVersionName + RESOURCE_ID, {
    code: Code.fromAsset(props.asset),
    compatibleRuntimes: props.compatibleRuntimes,
    layerVersionName: props.layerVersionName,
  });
}

function createLambdaFunction(
  scope: Construct,
  props: LambdaConfig,
  layers: ILayerVersion[]
) {
  return new Function(scope, props.componentName + RESOURCE_ID, {
    functionName: props.functionName,
    code: Code.fromAsset(props.asset),
    handler: props.handler,
    runtime: props.runtime,
    layers,
  });
}
