import express from 'express';

export default function(err: Error, _req: express.Request, res: express.Response): void {
  console.error(err);

  res.status(500);
};
