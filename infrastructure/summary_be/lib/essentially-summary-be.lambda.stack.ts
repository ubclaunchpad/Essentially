import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import { DeploymentTarget } from "../config/deployment";
import { Function, Code } from "aws-cdk-lib/aws-lambda";
import { APP_NAME, RESOURCE_ID } from "../config/constants";
import { Construct } from "constructs";
import {
  BACKEND_TO_DEPLOY_LAMBDAS,
  LambdaConfig,
} from "../config/lambda.config";

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

    this.lambdas = {};

    for (const config of BACKEND_TO_DEPLOY_LAMBDAS) {
      const functionCreated: Function = createLambdaFunction(this, config);
      this.lambdas[config.componentName] = functionCreated;
    }
  }
}

function createLambdaFunction(scope: Construct, props: LambdaConfig) {
  return new Function(scope, props.componentName + RESOURCE_ID, {
    functionName: props.functionName,
    code: Code.fromAsset(props.asset),
    handler: props.handler,
    runtime: props.runtime,
  });
}
