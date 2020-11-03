import express from 'express';
const {
  SHOPIFY_SHOP_DOMAIN,
} = require('./constants');

export default function(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const shop = req.header('X-Shopify-Shop-Domain');

  if (shop !== SHOPIFY_SHOP_DOMAIN) {
    return next(new Error('Shopify shop domain mismatch'));
  }

  next();
}
