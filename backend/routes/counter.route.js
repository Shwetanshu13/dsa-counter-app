import express from 'express';
import { getDailyCountRecords, incrementDailyCounter, getDailyCounter, recordDailyCount } from '../controllers/counter.controller.js';

const router = express.Router();

router.post('/increment', incrementDailyCounter);
router.get('/:userId', getDailyCounter);
router.post('/record', recordDailyCount);
router.get('/:userId/records', getDailyCountRecords);

export default router;