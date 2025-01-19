import { SurveyState, Option, QuestionResponse, SurveyActionTypes } from "../types/survey";
import { AnyAction } from 'redux';

const defaultInitialState: SurveyState = {
  questions: {},
  options: {},
  responses: {},
  parsedResponses: {},
  progress: 0
}

export const surveyReducer = (
  state: SurveyState = defaultInitialState,
  action: AnyAction,
): SurveyState => {
  switch (action.type) {
    case SurveyActionTypes.UPDATE_ALL_QUESTIONS: {
      const updatedQuestions = action.payload;
      return { ...state, questions: updatedQuestions };
    }
    case SurveyActionTypes.UPDATE_PROGRESS: {
      return { ...state, progress: state.progress + action.payload };
    }
    case SurveyActionTypes.UPDATE_OPTIONS: {
      const updatedOptions = state.options;
      updatedOptions[action.payload.key] = action.payload.options
      return { ...state, options: updatedOptions };
    }
    case SurveyActionTypes.UPDATE_RESPONSES: {
      const updatedResponses = state.responses;
      updatedResponses[action.payload.key] = action.payload.response
      return { ...state, responses: updatedResponses };
    }
    case SurveyActionTypes.UPDATE_PARSED_RESPONSES: {
      return { ...state, parsedResponses: action.payload };
    }
    case SurveyActionTypes.RESET: {
      return { ...state, responses: {}, parsedResponses: {} }
    }
    default:
      return state
  }
}

