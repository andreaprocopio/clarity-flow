export type whQuestionsType = {
  what: string
  who: string
  when: string
  how: string
}

export type DesiredOutcome = {
  mainGoal: string;
  completionCriteria: string;
  withoutProblem: string;
}

export const desiredOutcomeDefaultValue: DesiredOutcome = {
  mainGoal: "",
  completionCriteria: "",
  withoutProblem: ""
}

export type BrainstormedAction = {
  actions: string;
  whatHasWorked: string;
  whatCouldGoWrong: string;
  externalResources: string;
  simplestStep: string;
}

export const brainstormedActionDefaultValue: BrainstormedAction = {
  actions: "",
  whatHasWorked: "",
  whatCouldGoWrong: "",
  externalResources: "",
  simplestStep: "",
}

export type SmartAction = {
  isTaskSpecific: string;
  isTaskMeasurable: string;
  isTaskAchievable: string;
  isTaskRelevant: string;
  isTaskTimeBound: string;
}

export const smartActionDefaultValue: SmartAction = {
  isTaskSpecific: "",
  isTaskMeasurable: "",
  isTaskAchievable: "",
  isTaskRelevant: "",
  isTaskTimeBound: "",
}

export type ClarityFlow = {
  initialStatement: string;
  whQuestions: whQuestionsType;
  whQuestionsResult: string;
  idealSituation: string;
  gaps: string[];
  rootCauses: string[];
  desiredOutcomes: DesiredOutcome[];
  brainstormedActions: BrainstormedAction[];
  smartActions: SmartAction[];
}

export const clarityFlowInitialValue: ClarityFlow = {
  initialStatement: "",
  whQuestions: {
    what: "",
    who: "",
    when: "",
    how: ""
  },
  whQuestionsResult: "",
  idealSituation: "",
  gaps: [],
  rootCauses: [],
  desiredOutcomes: [],
  brainstormedActions: [],
  smartActions: []
}
