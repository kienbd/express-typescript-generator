import express from 'express';

const router = express.Router();

router.get('/healthcheck', (req, res, next) => {
  res.status(200).send('OK');
});

export default router;
