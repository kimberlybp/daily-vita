import { SimpleMap } from "./common"

export interface SurveyState {
  questions: SimpleMap<Question>
  options: SimpleMap<Option[]>
  responses: SimpleMap<QuestionResponse>
  parsedResponses: SimpleMap<QuestionResponse>
  progress: number
}

export interface Question {
  id: number
  label: string
  description: string
  type: QuestionType
  isRequired: boolean
  isSubquestion: boolean
  subQuestion?: Question
  additionalInfo?: string
}

export interface QuestionRawJson {
  id: number
  label: string
  description: string
  type: string
  is_required: boolean
  is_subquestion: boolean
  options_src?: string
  additionalInfo?: string
}

export interface Option {
  id: number
  name: string
  toolTip?: string
}

export interface OptionWithRanking extends Option {
  priority: number
}

export type QuestionResponse = Option | Option[] | OptionWithRanking[] | boolean | string

export enum QuestionType {
  MultipleResponseTag = 'multiple-response-tag',
  MultipleResponseCheckbox = 'multiple-response-checkbox',
  MultipleSelect = 'multiple-select',
  MultipleChoice = 'multiple-choice',
  Ranking = 'ranking',
  YesOrNo = 'yes-or-no',
}

export enum YesOrNo {
  Yes = 'Yes',
  No = 'No'
}

export const SurveyActionTypes = {
  INIT_SURVEY: '@survey/INIT_SURVEY',
  UPDATE_ALL_QUESTIONS: '@survey/UPDATE_ALL_QUESTIONS',
  UPDATE_OPTIONS: '@survey/UPDATE_OPTIONS',
  UPDATE_PROGRESS: '@survey/UPDATE_PROGRESS',
  UPDATE_RESPONSES: '@survey/UPDATE_RESPONSES',
  SUBMIT: '@survey/SUBMIT',
  UPDATE_PARSED_RESPONSES: '@survey/UPDATE_PARSED_RESPONSES',
  RESET: '@survey/RESET'
}

