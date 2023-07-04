import * as cdk from '@aws-cdk/core';
import {Construct} from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import {NodejsFunction, NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";
import {LogGroup, LogGroupProps} from '@aws-cdk/aws-logs';

interface LambdaProps extends NodejsFunctionProps {
  // name is determined by the lambda created
  logGroupProps?: Omit<LogGroupProps, "logGroupName">;
}

// no targets, because the lambda is the only target
interface RuleProps extends Omit<events.RuleProps, "targets"> {
  // schedule is always required instead of optional
  schedule: events.Schedule;
}

interface ScheduledLambdaProps {
  lambdaProps?: LambdaProps;
  ruleProps: RuleProps;
}

const defaultLambdaProps: Partial<NodejsFunctionProps> = {
  handler: 'handler',
  memorySize: 128,
  runtime: lambda.Runtime.NODEJS_16_X,
}

export class ScheduledLambda extends cdk.Construct {
  lambda: NodejsFunction;

  constructor(scope: Construct, id: string, props: ScheduledLambdaProps) {
    super(scope, id);

    this.lambda = this.createLambda(props.lambdaProps);
    this.scheduleLambda(props.ruleProps);
  }

  private createLambda(lambdaProps?: ScheduledLambdaProps["lambdaProps"]) {
    const lambda = new NodejsFunction(this, "Lambda", {
      ...defaultLambdaProps,
      ...lambdaProps
    });
    new LogGroup(this, 'LogGroup', {
      // this name makes it replace the default log group
      logGroupName: '/aws/lambda/' + lambda.functionName,
      ...lambdaProps?.logGroupProps
    });
    return lambda;
  }

  private scheduleLambda(ruleProps: ScheduledLambdaProps["ruleProps"]) {
    const rule = new events.Rule(this, 'Schedule', ruleProps);
    rule.addTarget(new targets.LambdaFunction(this.lambda));
  }
}
