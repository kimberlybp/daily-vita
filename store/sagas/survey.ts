import { ALCOHOL_LABEL, DAILY_EXPOSURE_LABEL, DIETS_LABEL, NONE_ID, NONE_LABEL, SMOKE_LABEL } from '@/constants/Common';
import optionResources from '@/constants/OptionResources';
import { all, fork, put, select, takeLatest } from 'redux-saga/effects';
import { updateAllQuestions, updateOptions, updateParsedResponses } from '../actions.ts/survey';
import { SimpleMap } from '../types/common';
import { Option, Question, QuestionRawJson, QuestionResponse, QuestionType, SurveyActionTypes, YesOrNo } from '../types/survey';

type JsonRes = {
  data: any
}

export function parseQuestionType(input: string): QuestionType | undefined {
  const normalizedInput = input.trim().toLowerCase();

  for (const key in QuestionType) {
    if (QuestionType[key as keyof typeof QuestionType].toLowerCase() === normalizedInput) {
      return QuestionType[key as keyof typeof QuestionType];
    }
  }

  return undefined;
}


function* initialise() {
  try {
    const questionsJson = require('../../assets/data/questions.json')
    const questionRawData = questionsJson.data as QuestionRawJson[]
    const parsedQuestions: SimpleMap<Question> = {}

    for (const question of questionRawData) {
      const parsedType = parseQuestionType(question.type)

      if (parsedType) {
        // Init options if any
        const isOptionsRequired = parsedType === QuestionType.MultipleResponseTag || parsedType === QuestionType.MultipleResponseCheckbox || parsedType === QuestionType.MultipleSelect
        if (isOptionsRequired) {
          const optionsJson = optionResources[question.label] as JsonRes
          const options: Option[] = optionsJson.data
          yield put(updateOptions(question.id, options))
        }

        if (question.is_subquestion) {
          const subQuestion: Question = {
            ...question,
            isRequired: question.is_required,
            isSubquestion: question.is_subquestion,
            type: parsedType,
          }

          // Assumption: Parent questions of subquestion will always exist first in the parsed list
          const parentQuestionIndex = Object.values(parsedQuestions).findIndex((value) => value.label === subQuestion.label)

          if (parentQuestionIndex) {
            const parentQuestion = parsedQuestions[parentQuestionIndex]
            parsedQuestions[parentQuestionIndex] = {
              ...parentQuestion,
              subQuestion,
            }
          }
        } else {
          parsedQuestions[question.label] = {
            ...question,
            isRequired: question.is_required,
            isSubquestion: question.is_subquestion,
            type: parsedType,
          }
        }
      }
    }
    yield put(updateAllQuestions(parsedQuestions))
  } catch (e) {
    // TODO: Implement global snackbar mechanism for errors
    console.log(e)
  }
}

function* submit() {
  try {
    const responses: SimpleMap<QuestionResponse> = yield select((state) => state.survey.responses)
    const parsed: SimpleMap<QuestionResponse> = {}
    for (const [label, response] of Object.entries(responses)) {
      if (label === DIETS_LABEL) {
        const typedRes = response as Option[]
        if (typedRes.findIndex(r => r.id === NONE_ID && r.name === NONE_LABEL) > -1) {
          parsed[label] = []
          continue
        }
      }

      if (label === DAILY_EXPOSURE_LABEL || label === SMOKE_LABEL) {
        const typedRes = response as Option
        parsed[label] = typedRes.name === YesOrNo.Yes
        continue
      }

      if (label === ALCOHOL_LABEL) {
        const typedRes = response as Option
        parsed[label] = typedRes.name
        continue
      }

      parsed[label] = response
    }
    console.log(JSON.stringify(parsed, null, 2))
    yield put(updateParsedResponses(parsed))
  } catch (e) {
    // TODO: Implement global snackbar mechanism for errors
    console.log(e)
  }
}

function* watchInitSurvey() {
  yield takeLatest(SurveyActionTypes.INIT_SURVEY, initialise);
}

function* watchSubmitSurvey() {
  yield takeLatest(SurveyActionTypes.SUBMIT, submit);
}

export default function* surveySaga() {
  yield all([
    watchInitSurvey,
    watchSubmitSurvey
  ].map(fork))
}
