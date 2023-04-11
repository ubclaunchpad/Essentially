import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  StackProps,
  aws_s3 as s3,
  RemovalPolicy,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { DeploymentTarget } from '../config/deployment';
import { APP_NAME } from '../config/constants';
import { CorsRule } from 'aws-cdk-lib/aws-s3';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface EssentiallyBackendS3StackProps extends StackProps {
  target: DeploymentTarget;
}

export const ESSENTIALLY_BACKEND_S3_STACK_NAME =
  APP_NAME.PREFIX.concat('S3Stack');

export class EssentiallyBackendS3Stack extends cdk.Stack {
  public testBucket: s3.Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: EssentiallyBackendS3StackProps
  ) {
    super(scope, id, props);

    this.testBucket = createBucket(this, props.target, [
      {
        allowedHeaders: ['*'],
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
        allowedOrigins: ['*'],
      },
    ]);

    this.testBucket.addToResourcePolicy(
      new PolicyStatement(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [new iam.AnyPrincipal()],
          resources: [
            this.testBucket.bucketArn,
            this.testBucket.bucketArn.concat('/*'),
          ],
          actions: ['s3:GetObject'],
        })
      )
    );
  }
}

const createBucket: (
  scope: Construct,
  target: DeploymentTarget,
  cors?: CorsRule[]
) => s3.Bucket = (scope, target, cors) => {
  return new s3.Bucket(scope, APP_NAME.PREFIX.concat('TestBucket'), {
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
    cors: cors,
  });
};
