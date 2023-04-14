import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { DeploymentTarget } from '../config/deployment';
import { Function, Code } from 'aws-cdk-lib/aws-lambda';
import { APP_NAME, RESOURCE_ID } from '../config/constants';
import { Construct } from 'constructs';
import { TO_DEPLOY_APIS } from '../config/apigateway.config';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Cors } from 'aws-cdk-lib/aws-apigateway';

export interface EssentiallyBackendApigatewayStackProps extends StackProps {
  target: DeploymentTarget;
  lambdas: Record<string, Function>;
}

export const ESSENTIALLY_BACKEND_APIGATEWAY_STACK_NAME =
  APP_NAME.PREFIX.concat('APIGatewayStack');

const SERVICE_NAME = APP_NAME.PREFIX.concat('-Service');

export class EssentiallyBackendApigatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: EssentiallyBackendApigatewayStackProps
  ) {
    super(scope, id, props);

    const api: apigateway.RestApi = new apigateway.RestApi(
      this,
      SERVICE_NAME.concat('-id'),
      {
        restApiName: SERVICE_NAME,
        description: 'Essentially '.concat(SERVICE_NAME),
        defaultCorsPreflightOptions: {
          allowOrigins: Cors.ALL_ORIGINS,
        },
      }
    );

    for (const apiConfig of TO_DEPLOY_APIS) {
      const components = api.root.addResource(apiConfig.componentName);
      const lambdaMethod: apigateway.LambdaIntegration =
        new apigateway.LambdaIntegration(
          props.lambdas[apiConfig.componentName],
          {
            requestTemplates: apiConfig.requestTemplates,
          }
        );

      components.addMethod(apiConfig.methodType, lambdaMethod);
    }
  }
}
