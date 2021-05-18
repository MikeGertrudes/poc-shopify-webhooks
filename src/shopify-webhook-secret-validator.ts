import express from 'express';
import crypto from 'crypto';

import {
  SHOPIFY_WEBHOOK_SECRET,
} from './constants';

export default function(req: express.Request, _res: express.Response, next: express.NextFunction): void {
  const hmac = req.header('X-Shopify-Hmac-Sha256');

  const signature = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(Buffer.from(req.body))
    .digest('base64');

  if (signature !== hmac) {
    return next(new Error('Shopify HMAC invalid'));
  }

  next();
}
