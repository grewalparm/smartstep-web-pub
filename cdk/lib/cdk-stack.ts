import {
  aws_iam as iam,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "SmartSTEPWeb", {
      bucketName: "smartstep-web-first", // Choose your own bucket name here
      websiteIndexDocument: "index.html",
    });

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "OAI");

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "MyDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: cloudFrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    bucket.grantRead(cloudFrontOAI.grantPrincipal);
  }
}
