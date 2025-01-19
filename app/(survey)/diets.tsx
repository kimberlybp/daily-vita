import CustomButton from "@/components/CustomButton";
import MultipleResponseCheckboxQuestion from "@/components/Questions/MultipleResponseCheckboxQuestion";
import ThemedView from "@/components/ThemedView";
import { DIETS_LABEL, NONE_ID, NONE_LABEL, PROGRESS_PER_PAGE } from "@/constants/Common";
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

const DietsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const question = useSelect(getQuestionByLabel(DIETS_LABEL))
  const options = useSelect(getOptionsByQuestionId(question?.id.toString()))
  const response = useSelect(getQuestionResponse(DIETS_LABEL))

  const updatedOptions = useMemo(() => {
    return [{ id: NONE_ID, name: NONE_LABEL }, ...(options ?? [])]
  }, [options])

  const isNextDisabled: boolean = useMemo(() => {
    return !!(!response || (response && Array.isArray(response) && response.length === 0))
  }, [response])


  if (!question || !options || (options && options.length === 0)) {
    return null
  }

  const onRespond = (selectedOptions: Option[], optionAdded?: Option) => {
    let toUpdate = selectedOptions
    if (optionAdded?.id === NONE_ID) {
      toUpdate = [optionAdded]
    } else if (selectedOptions.findIndex((opt) => opt.id === NONE_ID) > -1 && selectedOptions.length > 1) {
      toUpdate = selectedOptions.filter((opt) => opt.id !== NONE_ID)
    }
    dispatch(updateResponses(DIETS_LABEL, toUpdate))
  }

  const onNext = () => {
    dispatch(updateProgressBar(PROGRESS_PER_PAGE))
  }

  return (
    <ThemedView>
      <MultipleResponseCheckboxQuestion
        question={question}
        options={updatedOptions}
        responseCallback={onRespond} />
      <View style={globalStyles.bottomButtonGroup}>
        <CustomButton mode="text" onPress={() => {
          dispatch(updateProgressBar(-PROGRESS_PER_PAGE))
          navigation.goBack()
        }}>
          Back
        </CustomButton>
        <Link href={NavigationPaths.SURVEY.LIFESTYLE} disabled={isNextDisabled} onPress={onNext} asChild>
          <CustomButton mode="contained" disabled={isNextDisabled}>
            Next
          </CustomButton>
        </Link>
      </View>
    </ThemedView>
  );
};

export default DietsView;