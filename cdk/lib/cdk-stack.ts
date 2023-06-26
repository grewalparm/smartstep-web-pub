import { aws_iam as iam, aws_s3 as s3, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "SmartSTEPWeb", {
      bucketName: "smartstep-web-first", // Choose your own bucket name here
      websiteIndexDocument: "index.html", // 1
      blockPublicAccess: new s3.BlockPublicAccess({
        restrictPublicBuckets: false,
      }), // 2
    });

    const bucketPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.AnyPrincipal()],
    });
    bucket.addToResourcePolicy(bucketPolicy); // 4
  }
}
