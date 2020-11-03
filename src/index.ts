const dotenv = require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import {
  SHOPIFY_WEBHOOK_TOPIC,
} from './constants';

import shopifyShopDomainValidator from './shopify-shop-domain-validator';
import shopifyWebhookTopicValidator from './shopify-webhook-topic-validator';
import shopifyWebhookSecretValidator from './shopify-webhook-secret-validator';
import handler from './handler';
import errorHandler from './error-handler';

const app = express();

app
  .set('port', 3000)
  .use(
    bodyParser.text({
      type: (req: http.IncomingMessage) => req.headers['x-shopify-hmac-sha256']
    })
   )
  .post(`/v1/webhooks/shopify/${SHOPIFY_WEBHOOK_TOPIC}`,
    shopifyShopDomainValidator,
    shopifyWebhookTopicValidator,
    shopifyWebhookSecretValidator,
    handler,
    errorHandler,
  )
  .listen(3000, () => {
    console.log(`Listening on port ${app.get('port')}`);
  });