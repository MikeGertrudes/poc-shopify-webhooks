import AWS from 'aws-sdk';
import express from 'express';

import {
  AWS_SQS_QUEUE_URL,
  AWS_SQS_REGION
} from './constants';

const sqs = new AWS.SQS({
  region: AWS_SQS_REGION
});

export default function(req: express.Request, res: express.Response, next: express.NextFunction): void {
  sqs
    .sendMessage({
      MessageBody: req.body,
      QueueUrl: AWS_SQS_QUEUE_URL,
    },
    (err: AWS.AWSError, data: AWS.SQS.SendMessageResult): void => {
      if (err) {
        return next(err);
      }

      console.log(`Message put on queue`, data);

      res.status(200).send(`Message put on queue`);
    }
  );
}
