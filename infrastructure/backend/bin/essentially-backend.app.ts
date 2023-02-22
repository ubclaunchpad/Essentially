#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {
  ESSENTIALLY_BACKEND_S3_STACK_NAME,
  EssentiallyBackendS3Stack,
} from '../lib/essentially-backend.s3.stack';
import { DeploymentTarget, deploymentTargets } from '../config/deployment';
import {
  ESSENTIALLY_BACKEND_LAMBDA_STACK_NAME,
  EssentiallyBackendLambdaStack,
} from '../lib/essentially-backend.lambda.stack';
import {
  ESSENTIALLY_BACKEND_APIGATEWAY_STACK_NAME,
  EssentiallyBackendApigatewayStack,
} from '../lib/essentially-backend.apigateway.stack';

const app = new cdk.App();

for (const deploymentTarget of deploymentTargets as DeploymentTarget[]) {
  new EssentiallyBackendS3Stack(
    app,
    ESSENTIALLY_BACKEND_S3_STACK_NAME.concat('-id'),
    {
      target: deploymentTarget,
      stackName: ESSENTIALLY_BACKEND_S3_STACK_NAME.concat('-name'),
    }
  );

  const lambdaStack: EssentiallyBackendLambdaStack =
    new EssentiallyBackendLambdaStack(
      app,
      ESSENTIALLY_BACKEND_LAMBDA_STACK_NAME.concat('-id'),
      {
        target: deploymentTarget,
        stackName: ESSENTIALLY_BACKEND_LAMBDA_STACK_NAME.concat('-name'),
      }
    );

  new EssentiallyBackendApigatewayStack(
    app,
    ESSENTIALLY_BACKEND_APIGATEWAY_STACK_NAME.concat('-id'),
    {
      target: deploymentTarget,
      stackName: ESSENTIALLY_BACKEND_APIGATEWAY_STACK_NAME.concat('-name'),
      lambdas: lambdaStack.lambdas,
    }
  );
}
