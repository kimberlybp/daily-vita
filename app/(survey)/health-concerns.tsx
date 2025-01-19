import CustomButton from "@/components/CustomButton";
import MultipleResponseTagQuestion from "@/components/Questions/MultipleResponseTagQuestion";
import ThemedView from "@/components/ThemedView";
import { PROGRESS_PER_PAGE } from "@/constants/Common";
import NavigationPaths from "@/constants/NavigationPaths";
import useSelect from "@/hooks/useSelect";
import { updateProgressBar, updateResponses } from "@/store/actions.ts/survey";
import { getOptionsByQuestionId, getQuestionByLabel, getQuestionResponse } from "@/store/selectors/survey";
import { Option } from "@/store/types/survey";
import globalStyles from '@/utils/GlobalStyleSheet';
import { Link, useNavigation } from "expo-router";
import React, { useMemo } from "react";
import { View } from 'react-native';
import { useDispatch } from "react-redux";

const QUESTION_LABEL = "health_concerns"

const HealthConcernsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const question = useSelect(getQuestionByLabel(QUESTION_LABEL))
  const options = useSelect(getOptionsByQuestionId(question?.id.toString()))
  const response = useSelect(getQuestionResponse(QUESTION_LABEL))

  const isNextDisabled: boolean = useMemo(() => {
    return !!(!response || (response && Array.isArray(response) && response.length === 0))
  }, [response])


  if (!question || !options || (options && options.length === 0)) {
    return null
  }

  const onRespond = (selectedOptions: Option[]) => {
    dispatch(updateResponses(QUESTION_LABEL, selectedOptions))
  }

  const onNext = () => {
    dispatch(updateProgressBar(PROGRESS_PER_PAGE))
  }

  return (
    <ThemedView>
      <MultipleResponseTagQuestion
        question={question}
        options={options}
        response={response}
        responseCallback={onRespond} />
      <View style={globalStyles.bottomButtonGroup}>
        <CustomButton mode="text" onPress={() => {
          dispatch(updateProgressBar(-PROGRESS_PER_PAGE))
          navigation.goBack()
        }}>
          Back
        </CustomButton>
        <Link href={NavigationPaths.SURVEY.DIETS} disabled={isNextDisabled} onPress={onNext} asChild>
          <CustomButton mode="contained" disabled={isNextDisabled}>
            Next
          </CustomButton>
        </Link>
      </View>
    </ThemedView>
  );
};

export default HealthConcernsView;