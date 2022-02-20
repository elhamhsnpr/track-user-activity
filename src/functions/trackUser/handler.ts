import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import 'source-map-support/register';


import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const body = event.body;

    const trackUserBody = {
        received: true,
        ...body

    }
    return formatJSONResponse({
        trackUserBody
    });
};

export const main = middyfy(handler);
// module.exports = serverlessConfiguration;
