// schema.ts
import { date, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const dsaUsers = pgTable('dsaUsers', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull()
});

export const dsaCounter = pgTable('dsaCounter', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull(),
    count: integer().notNull().default(0)
});

export const dailyCountRecord = pgTable('dailyCountRecord', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull(),
    date: date().notNull(),
    count: integer().notNull()
});
