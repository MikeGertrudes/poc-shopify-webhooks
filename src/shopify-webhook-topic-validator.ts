import express from 'express';

import {
  SHOPIFY_WEBHOOK_TOPIC,
} from './constants';

export default function(req: express.Request, _res: express.Response, next: express.NextFunction): void {
  const topic = req.header('X-Shopify-Topic');

  if (topic !== SHOPIFY_WEBHOOK_TOPIC) {
    return next(new Error(`Shopify topic mismatch`));
  }

  next();
}
