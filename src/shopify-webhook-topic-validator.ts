import express from 'express';
const {
  SHOPIFY_WEBHOOK_TOPIC,
} = require('./constants');

export default function(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const topic = req.header('X-Shopify-Topic');

  if (topic !== SHOPIFY_WEBHOOK_TOPIC) {
    return next(new Error('Shopify topic mismatch'));
  }

  next();
}
