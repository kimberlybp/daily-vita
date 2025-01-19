import { RootState } from "../reducers";
import { SimpleMap } from "../types/common";
import { Question, Option, QuestionResponse } from "../types/survey";

export function getQuestionByLabel(label: string = ''): (state: RootState) => Question | undefined {
  return (state: RootState) => state.survey.questions[label]
}

export function getOptionsByQuestionId(id: string = ''): (state: RootState) => Option[] | undefined {
  return (state: RootState) => state.survey.options[id]
}

export function getQuestionResponse(label: string = ''): (state: RootState) => QuestionResponse | undefined {
  return (state: RootState) => state.survey.responses[label]
}

export function getResponses(): (state: RootState) => SimpleMap<QuestionResponse> {
  return (state: RootState) => state.survey.responses
}
