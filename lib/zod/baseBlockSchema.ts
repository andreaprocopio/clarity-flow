import { z } from "zod";

const negationRegex = /\b(can(?:not|'t)|do(?: not|n't)|does(?: not|n't)|did(?: not|n't)|will(?: not|'t)|should(?: not|n't)|could(?: not|n't)|would(?: not|n't)|must(?: not|n't)|is(?: not|n't)|are(?: not|n't)|am(?: not|n't)|was(?: not|n't)|were(?: not|n't))\b/i;

export const baseBlockSchema = z.object({
  subject: z.string().min(1),
  verb: z
    .string()
    .min(1, "Verb is required")
    .refine(
      (val) => !negationRegex.test(val),
      {
        message: "Avoid negation in the verb. Use the checkbox instead.",
      }
    ),
  object: z.string().min(1),
  negation: z.boolean(),
});

const whySchema = z.object({
  why: baseBlockSchema,
  because: baseBlockSchema,
});

const solutionSchema = z.object({
  if: baseBlockSchema,
  then: baseBlockSchema,
});

const checklistItemSchema = z.object({
  itemText: z.string().min(1),
  completed: z.boolean(),
});

export const clarityFlowSchema = z.object({
  initialStatement: baseBlockSchema,
  whys: z.array(whySchema).min(1),
  solutions: z.array(solutionSchema).min(1),
  checklist: z.array(checklistItemSchema),
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  iconName: z.string().min(1),
});
