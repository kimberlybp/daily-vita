import CustomButton from "@/components/CustomButton";
import MultipleChoiceQuestion from "@/components/Questions/MultipleChoiceQuestion";
import ThemedView from "@/components/ThemedView";
import { ALCOHOL_LABEL, DAILY_EXPOSURE_LABEL, PROGRESS_PER_PAGE, RANGE_OPTIONS, SMOKE_LABEL, TRUE_FALSE_OPTIONS } from "@/constants/Common";
import NavigationPaths from "@/constants/NavigationPaths";
import useSelect from "@/hooks/useSelect";
import { submitSurvey, updateProgressBar, updateResponses } from "@/store/actions.ts/survey";
import { getQuestionByLabel, getQuestionResponse } from "@/store/selectors/survey";
import { Option } from "@/store/types/survey";
import globalStyles from '@/utils/GlobalStyleSheet';
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

const LifestyleView = () => {
  const dispatch = useDispatch()

  const questionOne = useSelect(getQuestionByLabel(DAILY_EXPOSURE_LABEL))
  const responseOne = useSelect(getQuestionResponse(DAILY_EXPOSURE_LABEL))

  const questionTwo = useSelect(getQuestionByLabel(SMOKE_LABEL))
  const responseTwo = useSelect(getQuestionResponse(SMOKE_LABEL))

  const questionThree = useSelect(getQuestionByLabel(ALCOHOL_LABEL))
  const responseThree = useSelect(getQuestionResponse(ALCOHOL_LABEL))

  const isNextDisabled: boolean = useMemo(() => {
    return !responseOne || !responseTwo || !responseThree
  }, [responseOne, responseTwo, responseThree])

  if (!questionOne || !questionTwo || !questionThree) {
    return null
  }


  const onRespond = (selectedOption: Option, label: string) => {
    dispatch(updateResponses(label, selectedOption))
  }

  const onSubmit = () => {
    dispatch(updateProgressBar(PROGRESS_PER_PAGE))
    dispatch(submitSurvey())
  }

  return (
    <ThemedView>
      <MultipleChoiceQuestion
        question={questionOne}
        options={TRUE_FALSE_OPTIONS}
        responseCallback={(selectedOption) => onRespond(selectedOption, DAILY_EXPOSURE_LABEL)} />
      <MultipleChoiceQuestion
        question={questionTwo}
        options={TRUE_FALSE_OPTIONS}
        responseCallback={(selectedOption) => onRespond(selectedOption, SMOKE_LABEL)} />
      <MultipleChoiceQuestion
        question={questionThree}
        options={RANGE_OPTIONS}
        responseCallback={(selectedOption) => onRespond(selectedOption, ALCOHOL_LABEL)} />
      <Link href={NavigationPaths.SURVEY.COMPLETE} disabled={isNextDisabled} onPress={onSubmit} asChild>
        <CustomButton style={globalStyles.bottom} mode="contained" disabled={isNextDisabled}>
          Get my personalized vitamin
        </CustomButton>
      </Link>
    </ThemedView>
  )
}

export default LifestyleView
