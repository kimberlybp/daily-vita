import { combineReducers } from "redux";
import { SurveyState } from "../types/survey";
import { surveyReducer } from "./survey";

export interface RootState {
  survey: SurveyState
}

const rootReducer = combineReducers({
  survey: surveyReducer
});

export default rootReducer
