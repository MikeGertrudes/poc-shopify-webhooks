import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as http from 'http';
import serverless from 'serverless-http';

import {
  PORT,
  SERVERLESS,
  SHOPIFY_WEBHOOK_TOPIC,
} from './constants';

import shopifyShopDomainValidator from './shopify-shop-domain-validator';
import shopifyWebhookTopicValidator from './shopify-webhook-topic-validator';
import shopifyWebhookSecretValidator from './shopify-webhook-secret-validator';
import shopifyOrdersCreateWebhookHandler from './handler-put-message-on-sqs';
import errorHandler from './error-handler';

const app = express();

app
  .use(cors())
  .disable('x-powered-by')
  .use(
    bodyParser.text({
      type: (req: http.IncomingMessage) => req.headers['x-shopify-hmac-sha256']
    })
   )
  .post(`/v1/webhooks/shopify/${SHOPIFY_WEBHOOK_TOPIC}`,
    shopifyShopDomainValidator,
    shopifyWebhookTopicValidator,
    shopifyWebhookSecretValidator,
    shopifyOrdersCreateWebhookHandler,
    errorHandler,
  );

if (!SERVERLESS) {
  app
    .set('port', PORT)
    .listen(app.get('port'), () => {
      console.log(`Listening on port ${app.get('port')}.`);
    });
}

const handler = serverless(app);

module.exports.server = async (event: any, context: any) => {
  return await handler(event, context);
};
