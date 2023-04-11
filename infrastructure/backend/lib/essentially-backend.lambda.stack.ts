import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { DeploymentTarget } from '../config/deployment';
import { Code, Function, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import {
  Effect,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { APP_NAME, RESOURCE_ID } from '../config/constants';
import { Construct } from 'constructs';
import {
  BACKEND_TO_DEPLOY_LAMBDAS,
  LambdaConfig,
} from '../config/lambda.config';
import * as path from 'path';

interface EssentiallyBackendLambdaStackProps extends StackProps {
  target: DeploymentTarget;
}

export const ESSENTIALLY_BACKEND_LAMBDA_STACK_NAME =
  APP_NAME.PREFIX.concat('LambdaStack');

export class EssentiallyBackendLambdaStack extends cdk.Stack {
  public lambdas: Record<string, Function>;
  public layer: LayerVersion;

  constructor(
    scope: Construct,
    id: string,
    props: EssentiallyBackendLambdaStackProps
  ) {
    super(scope, id, props);

    this.lambdas = {};

    this.layer = new LayerVersion(this, 'backend-layer', {
      code: Code.fromAsset(path.join(__dirname, '/../../../backend/layers')),
      compatibleRuntimes: BACKEND_TO_DEPLOY_LAMBDAS.map(
        (config) => config.runtime
      ),
    });

    for (const config of BACKEND_TO_DEPLOY_LAMBDAS) {
      const lambdaRole = getBasicLambdaRole(this, config.componentName);
      if (config.lambdaResources) {
        const lambdaInvocationPolicy = new PolicyStatement({
          actions: ['lambda:InvokeFunction'],
          resources: config.lambdaResources,
        });
        lambdaRole.addToPolicy(lambdaInvocationPolicy);
      }
      if (config.s3Resources) {
        const s3Policy = new PolicyStatement({
          actions: ['s3:*'],
          resources: config.s3Resources,
          effect: Effect.ALLOW,
        });
        lambdaRole.addToPolicy(s3Policy);
      }
      const functionCreated: Function = createLambdaFunction(
        this,
        config,
        this.layer,
        lambdaRole
      );
      this.lambdas[config.componentName] = functionCreated;
    }
  }
}

function createLambdaFunction(
  scope: Construct,
  props: LambdaConfig,
  layer: LayerVersion,
  role?: Role
) {
  return new Function(scope, props.componentName + RESOURCE_ID, {
    functionName: props.functionName,
    code: Code.fromAsset(props.asset),
    handler: props.handler,
    runtime: props.runtime,
    layers: [layer],
    timeout: props.timeout,
    ...(role && { role }),
  });
}

function getBasicLambdaRole(scope: Construct, componentName: string): Role {
  const lambdaRole = new Role(scope, 'LambdaRole-' + componentName, {
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
  });

  const policy = new PolicyStatement({
    actions: [
      'logs:CreateLogGroup',
      'logs:CreateLogStream',
      'logs:PutLogEvents',
    ],
    resources: ['*'],
    effect: Effect.ALLOW,
  });

  lambdaRole.addToPolicy(policy);

  return lambdaRole;
}
