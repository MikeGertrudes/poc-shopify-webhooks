import express from 'express';

import {
  SHOPIFY_SHOP_DOMAIN,
} from './constants';

export default function(req: express.Request, _res: express.Response, next: express.NextFunction): void {
  const shop = req.header('X-Shopify-Shop-Domain');

  if (shop !== SHOPIFY_SHOP_DOMAIN) {
    return next(new Error('Shopify shop domain mismatch'));
  }

  next();
}
