import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import Ajv from 'ajv';
// import 'source-map-support/register';
import * as AWS from 'aws-sdk';

import schema from './schema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {

        const ajv = new Ajv();

        const body = event.body;

        const validate = ajv.compile(schema);
        const valid = validate(body)

        if (valid) {

            // const trackUserBody = {
            //     received: true,
            //     ...body

            // }

            const userTrackParams = {
                TableName: 'userTrack-table',
                Item: {
                    ...body
                }
            }

            const data = await dynamodb.put(userTrackParams)
                .promise()
                
            return formatJSONResponse({
                message: "Item successfully added to the DB"
            });

            // return formatJSONResponse({
            //     trackUserBody
            // });

        } else {

            return formatJSONResponse({
                statusCode: 400,
                body: ajv.errorsText(validate.errors)
            });

        }

    } catch (error) {
        return formatJSONResponse({
            statusCode: 500,
            body: error
        });
    }
};

export const main = middyfy(handler);
