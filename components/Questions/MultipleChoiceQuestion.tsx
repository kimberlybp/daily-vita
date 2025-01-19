import useSelect from '@/hooks/useSelect';
import { getQuestionResponse } from '@/store/selectors/survey';
import { Option, Question } from '@/store/types/survey';
import React from "react";
import { StyleSheet, View, ViewProps } from 'react-native';
import CustomCheckbox from '../CustomCheckbox';
import QuestionDescription from '../QuestionDescription';
import RadioButton from '../RadioButton';

export type MultipleChoiceQuestionProps = ViewProps & {
  question: Question
  options: Option[]
  responseCallback: (selectedOption: Option) => void
}

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
  const { question, options, responseCallback, style, ...rest } = props
  const response: Option = useSelect(getQuestionResponse(question.label)) as Option

  const onSelectOption = (option: Option) => {
    responseCallback(option)
  }

  return (
    <View style={[styles.root, style]} {...rest}>
      <QuestionDescription
        isRequired={question.isRequired}
        additionalInfo={question.additionalInfo}
      >
        {question.description}
      </QuestionDescription>
      <View style={styles.optionsContainer}>
        {options.map((opt) => (
          <RadioButton
            key={opt.id}
            selected={response && response.id === opt.id}
            onPress={(e) => {
              onSelectOption(opt)
            }}>
            {opt.name}
          </RadioButton>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 32
  },
  optionsContainer: {
    marginTop: 24,
    gap: 24
  },
});

export default MultipleChoiceQuestion;
