import { uuid, timestamp, pgTable, varchar, text, pgEnum  } from "drizzle-orm/pg-core";
import { InferSelectModel } from 'drizzle-orm';

export type Task = InferSelectModel<typeof tasksTable>;

export const TASK_STATE_ENUM = pgEnum('task_state', ["TO_DO", "PAST_DUE", "FAILED", "COMPLETED"]);

export const tasksTable = pgTable("tasks", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  user_id: text("user_id").notNull(),
  title: varchar({ length: 255 }).notNull(),
  gap: varchar({ length: 255 }).notNull(),
  root_cause: varchar({ length: 255 }).notNull(),
  without_problem: text("without_problem"),
  what_has_worked_before: text("what_has_worked_before"),
  what_could_go_wrong: text("what_could_go_wrong"),
  external_resources: text("external_resources"),
  simplest_step: text("simplest_step"),
  specific_description: text("specific_description"),
  measurable_completion_criteria: text("measurable_completion_criteria"),
  achievable_description: text("achievable_description"),
  relevance_description: text("relevance_description"),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  completed_at: timestamp('completed_at', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  task_state: TASK_STATE_ENUM().notNull().default("TO_DO")
});
