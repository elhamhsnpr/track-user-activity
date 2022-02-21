import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import trackUser  from '@functions/trackUser';

const serverlessConfiguration: AWS = {
  service: 'track-user-activity',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region:'eu-central-1',
    iamRoleStatements: 
    [
      {
        Effect:'Allow',
        Action:['dynamodb:PutItem'],
        Resource:'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.USERTRACK_TABLE}'
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      USERTRACK_TABLE:'userTrack    -table',
      AWS_ACCOUNT_ID:'IAM_USER_ID_GOES_HERE',
    },
  },
  // import the function via paths
  functions: { hello ,trackUser},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources:{
    Resources:{
      userTrackTable:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"userTrack-table",
          AttributeDefinitions:[
            {AttributeName:'userId', AttributeType:'S'},
            {AttributeName:'createdAt', AttributeType:'N'}
          ],
          KeySchema:[
            {AttributeName:'userId', KeyType:'HASH'},
            {AttributeName:'createdAt', KeyType:'RANGE'}
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      }
    }
  }
};

module.exports = serverlessConfiguration;
