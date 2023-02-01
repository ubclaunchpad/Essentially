#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {
  ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME,
  EssentiallySummaryBES3Stack,
} from '../lib/essentially-summary-be.s3.stack';
import { DeploymentTarget, deploymentTargets } from '../config/deployment';

const app = new cdk.App();

for (const deploymentTarget of deploymentTargets as DeploymentTarget[]) {
  const essentiallySummaryBES3Stack: EssentiallySummaryBES3Stack =
    new EssentiallySummaryBES3Stack(
      app,
      ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME.concat('-id'),
      {
        target: deploymentTarget,
        stackName: ESSENTIALLY_SUMMARY_BE_S3_STACK_NAME.concat('-name'),
      }
    );
}
