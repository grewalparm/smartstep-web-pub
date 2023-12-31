import {
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_iam as iam,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "SmartSTEPWeb", {
      bucketName: "smartstep-web-first", // Choose your own bucket name here
      websiteIndexDocument: "index.html",
    });

    // 1
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "smartstepai.com",
    });

    // 2
    const certificate = new Certificate(this, "Certificate", {
      domainName: "smartstepai.com",
      validation: CertificateValidation.fromDns(hostedZone),
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
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate, // 1
          {
            aliases: ["smartstepai.com"],
            securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1, // 2
            sslMethod: cloudfront.SSLMethod.SNI, // 3
          }
        ),
      }
    );

    new route53.ARecord(this, "Alias", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    bucket.grantRead(cloudFrontOAI.grantPrincipal);
  }
}
