import { Duration } from "aws-cdk-lib";
import { CronOptions } from "aws-cdk-lib/aws-events";

// @aws-cdk/aws-events/lib/schedule.ts
export declare abstract class Schedule {
    /**
     * Construct a schedule from a literal schedule expression.
     *
     * @param expression The expression to use.
     * @stability stable
     */
    static expression(expression: string): Schedule;
    /**
     * Construct a schedule from an interval and a time unit.
     *
     * @stability stable
     */
    static rate(duration: Duration): Schedule;
    /**
     * Create a schedule from a set of cron fields.
     *
     * @stability stable
     */
    static cron(options: CronOptions): Schedule;
    /**
     * Retrieve the expression for this schedule.
     *
     * @stability stable
     */
    abstract readonly expressionString: string;
    /**
     * @stability stable
     */
    protected constructor();
}
