export type BaseBlock = {
  subject: string;
  verb: string;
  object: string;
  negation: boolean;
}

export type Why = {
  why: BaseBlock
  because: BaseBlock
}

export type Solutions = {
  if: BaseBlock
  then: BaseBlock
}

export type ChecklistItem = {
  itemText: string;
  completed: boolean;
}

export type ClarityFlow = {
  initialStatement: BaseBlock;
  whys: Why[]
  solutions: Solutions[]
  title: string;
  description: string;
  checklist: ChecklistItem[];
  startDate: Date;
  endDate: Date;
  iconName: string;
}

export const baseBlockInitialValue: BaseBlock = {
  subject: "",
  verb: "",
  object: "",
  negation: false
}

export const clarityFlowInitialValue: ClarityFlow = {
  initialStatement: baseBlockInitialValue,
  whys: [],
  solutions: [],
  title: "",
  description: "",
  checklist: [],
  startDate: new Date(),
  endDate: new Date(),
  iconName: "list-todo",
}
