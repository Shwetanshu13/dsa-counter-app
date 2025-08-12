import db from '../db/index.js'
import { dailyCountRecord, dsaCounter } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export const incrementDailyCounter = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        // Fetch current count
        const counterArr = await db.select().from(dsaCounter).where(eq(dsaCounter.userId, userId));
        if (!counterArr || counterArr.length === 0) {
            res.status(404).json({ message: 'Counter not found' });
            return;
        }
        const currentCount = counterArr[0].count;
        const newCount = currentCount + 1;

        await db.update(dsaCounter).set({ count: newCount }).where(eq(dsaCounter.userId, userId));

        res.status(200).json({ message: 'Counter incremented successfully', count: newCount });
    } catch (error) {
        console.error('Error incrementing counter:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDailyCounter = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const counter = await db.select().from(dsaCounter).where(eq(dsaCounter.userId, userId));

        if (!counter) {
            return res.status(404).json({ message: 'Counter not found' });
        }

        res.status(200).json(counter);
    } catch (error) {
        console.error('Error fetching counter:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const recordDailyCount = async (req, res) => {
    try {
        const date = new Date();
        const allDailyCounters = await db.select().from(dsaCounter);
        allDailyCounters.forEach(async (counter) => {
            await db.insert(dailyCountRecord).values({
                userId: counter.userId,
                count: counter.count,
                date: date
            });
            await db.update(dsaCounter).set({ count: 0 }).where(eq(dsaCounter.userId, counter.userId));
        });
    } catch (error) {
        console.error('Error updating daily counters:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDailyCountRecords = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const records = await db.select().from(dailyCountRecord).where(eq(dailyCountRecord.userId, userId));

        if (!records || records.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching daily count records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
