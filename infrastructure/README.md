# Essentially Infrastructure

This is a blank project for CDK development with TypeScript for [Essentially](https://github.com/ubclaunchpad/Essentially).

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Before Setting Up
- Make sure you are only making changes to the alpha account instead of the prod account unless you are allowed to do so.
- This documentation applies to both `backend` and `summary_be` infrastructure directories. To perform operation based on this doc, make sure you are in one of those directories.

## Set Up

To set up your aws account for *Essentially Infrastructure*, please do the following

### Alpha AWS Account

1. Ask an admin to create a sso (single sign on) user for your AWS account. Verified by
   assuming the granted role with [SSO start URL](https://d-926755e36e.awsapps.com/start).

### Set up development environment in Alpha Account

1. Make sure you can assume the granted role with [SSO start URL](https://d-926755e36e.awsapps.com/start).
2. Install AWS CLI
   following [this tutorial](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
3. Run the `aws configure sso` command and provide your information
    ```shell
    $ aws configure sso
    SSO session name: my-sso
    SSO start URL [None]: https://my-sso-portal.awsapps.com/start
    SSO region [None]: us-west-2
    SSO registration scopes [None]: sso:account:access
    ```
4. Then it will open your browser and take you to the login page, if the login success, you will need to configure a
   profile
    ```shell
    CLI default client Region [None]: us-west-2
    CLI default output format [None]: json
    CLI profile name [None]: test-profile
    ```
5. Now you can log in from command line with either `aws sso login --sso-session my-sso`
   or `aws sso login --profile test-profile`
6. Configure your local environment with `aws configure`, you can put nothing (just hit \<ENTER\>)
   for `aws_access_key_id` and `aws_secret_access_key` because we are using sso to sign in
7. Install CDK CLI
   following [this tutorial](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install)
8. Now you have finished the development environment set up and can deploy your change to the alpha account (
   read [Make changes to Essentially Infrastructure](#make-changes-to-essentially-infrastructure-in-alpha))

## Make changes to essentially-infrastructure in Alpha

1. Make sure you are in the root of the repository
2. Run `aws sso login --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE}`
3. Run `npm run build`
4. Run `cdk bootstrap --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE}` if this is the first time you deploy
5. Optional: Run `cdk synth --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE}` to constructs the CloudFormation template
6. Optional: Run `cdk ls` to view your stack
7. Run `cdk deploy ${TARGET_STACK} --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE}` to deploy the stack you have changed

## Useful commands

* `cdk deploy "*" --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE} --require-approval never` Deploy all changes to the infrastructure without manually provision the process
* `cdk destroy --all --profile ${YOUR_DEPLOYMENT_TARGET_PROFILE}` Destroy all stacks in the account
