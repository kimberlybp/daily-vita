import useSelect from '@/hooks/useSelect';
import { getQuestionResponse } from '@/store/selectors/survey';
import { Option, Question } from '@/store/types/survey';
import React from "react";
import { StyleSheet, View, ViewProps } from 'react-native';
import CustomCheckbox from '../CustomCheckbox';
import QuestionDescription from '../QuestionDescription';

export type MultipleResponseCheckboxQuestionProps = ViewProps & {
  question: Question
  options: Option[]
  responseCallback: (selectedOptions: Option[], optionAdded?: Option) => void
}

const MultipleResponseCheckboxQuestion = (props: MultipleResponseCheckboxQuestionProps) => {
  const { question, options, responseCallback, ...rest } = props
  const response: Option[] = useSelect(getQuestionResponse(question.label)) as Option[] ?? []

  const onToggleCheckbox = (option: Option, isChecked: boolean) => {
    let updated = [...response]
    if (!isChecked) {
      updated = updated.filter((value) => value.id !== option.id)
    } else {
      updated.push(option)
    }
    responseCallback(updated, isChecked ? option : undefined)
  }

  const isCheckboxChecked = (option: Option) => {
    return (response.length > 0 && ((response.findIndex((value) => value.id === option.id) > -1)))
  }

  return (
    <View {...rest}>
      <QuestionDescription
        isRequired={question.isRequired}
        additionalInfo={question.additionalInfo}
      >
        {question.description}
      </QuestionDescription>
      <View style={styles.checkboxesContainer}>
        {options.map((opt) => (
          <CustomCheckbox 
            key={opt.id} 
            text={opt.name}
            isChecked={isCheckboxChecked(opt)}
            onPress={(isChecked) => {
            onToggleCheckbox(opt, isChecked)
          }} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxesContainer: {
    marginTop: 24,
    gap: 24
  },
});

export default MultipleResponseCheckboxQuestion;
