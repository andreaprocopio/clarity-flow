import {
  uuid,
  timestamp,
  pgTable,
  varchar,
  text,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export type Task = InferSelectModel<typeof tasksTable>;

export const TASK_STATE_ENUM = pgEnum("task_state", ["TO_DO", "COMPLETED"]);

export const tasksTable = pgTable("tasks", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  user_id: text("user_id").notNull(),

  title: varchar({ length: 255 }).notNull(),
  description: text("description").notNull(),

  icon: varchar({ length: 255 }).notNull().default("list-todo"),

  initial_statement: json("initial_statement").notNull(),
  whys: json("whys").notNull(), 
  solutions: json("solutions").notNull(), 
  checklist: json("checklist").notNull(), 

  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  completed_at: timestamp("completed_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),

  task_state: TASK_STATE_ENUM().notNull().default("TO_DO"),
});
