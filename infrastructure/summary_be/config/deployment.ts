export interface DeploymentTarget {
  readonly name: string;
  readonly account: string;
  readonly region: string;
  readonly type: string;
}

const ALPHA_ACCOUNT = {
  name: 'alpha',
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
  type: 'dev',
} as DeploymentTarget;

export const deploymentTargets: DeploymentTarget[] = [ALPHA_ACCOUNT];
