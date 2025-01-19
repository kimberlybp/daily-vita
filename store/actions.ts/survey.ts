import { action } from 'typesafe-actions'
import { Option, Question, QuestionResponse, SurveyActionTypes } from '../types/survey'
import { SimpleMap } from '../types/common'

export const initialiseSurvey = () => action(
  SurveyActionTypes.INIT_SURVEY,
)

export const updateAllQuestions = (questions: SimpleMap<Question>) => action(
  SurveyActionTypes.UPDATE_ALL_QUESTIONS,
  questions
)

export const updateOptions = (key: number, options: Option[]) => action(
  SurveyActionTypes.UPDATE_OPTIONS,
  {
    key,
    options
  }
)

export const updateResponses = (key: string, response: QuestionResponse) => action(
  SurveyActionTypes.UPDATE_RESPONSES,
  {
    key,
    response
  }
)

export const updateProgressBar = (value: number) => action(
  SurveyActionTypes.UPDATE_PROGRESS,
  value
)

export const submitSurvey = () => action(
  SurveyActionTypes.SUBMIT,
)

export const updateParsedResponses = (parsed: SimpleMap<QuestionResponse>) => action(
  SurveyActionTypes.UPDATE_PARSED_RESPONSES,
  parsed
)

export const resetSurveyResponses = () => action(
  SurveyActionTypes.RESET,
)
