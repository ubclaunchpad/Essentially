#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {
  ESSENTIALLY_BACKEND_S3_STACK_NAME,
  EssentiallyBackendS3Stack,
} from '../lib/essentially-backend.s3.stack';
import { DeploymentTarget, deploymentTargets } from '../config/deployment';

const app = new cdk.App();

for (const deploymentTarget of deploymentTargets as DeploymentTarget[]) {
  const essentiallyBackendS3Stack: EssentiallyBackendS3Stack =
    new EssentiallyBackendS3Stack(
      app,
      ESSENTIALLY_BACKEND_S3_STACK_NAME.concat('-id'),
      {
        target: deploymentTarget,
        stackName: ESSENTIALLY_BACKEND_S3_STACK_NAME.concat('-name'),
      }
    );
}
