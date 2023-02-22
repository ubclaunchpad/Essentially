#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {
  ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME,
  EssentiallySummaryBackendS3Stack,
} from "../lib/essentially-summary-be.s3.stack";
import { DeploymentTarget, deploymentTargets } from "../config/deployment";
import {
  ESSENTIALLY_SUMMARY_BE_LAMBDA_STACK_NAME,
  EssentiallySummaryBackendLambdaStack,
} from "../lib/essentially-summary-be.lambda.stack";

const app = new cdk.App();

for (const deploymentTarget of deploymentTargets as DeploymentTarget[]) {
  new EssentiallySummaryBackendS3Stack(
    app,
    ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME.concat("-id"),
    {
      target: deploymentTarget,
      stackName: ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME.concat("-name"),
    }
  );

  new EssentiallySummaryBackendLambdaStack(
    app,
    ESSENTIALLY_SUMMARY_BE_LAMBDA_STACK_NAME.concat("-id"),
    {
      target: deploymentTarget,
      stackName: ESSENTIALLY_SUMMARY_BE_LAMBDA_STACK_NAME.concat("-name"),
    }
  );
}
