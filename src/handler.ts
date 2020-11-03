import express from 'express';

export default function(req: express.Request, res: express.Response): void {
  console.log('Good to go!');

  res.status(200);
};