import { Option, Question, QuestionResponse } from '@/store/types/survey';
import React, { useState } from "react";
import { StyleSheet, View, ViewProps } from 'react-native';
import CustomChip from '../CustomChip';
import QuestionDescription from '../QuestionDescription';

export type MultipleResponseTagQuestionProps = ViewProps & {
  question: Question
  options: Option[]
  responseCallback: (selectedOptions: Option[]) => void
  response?: QuestionResponse
}

const MultipleResponseTagQuestion = (props: MultipleResponseTagQuestionProps) => {
  const { question, options, response, responseCallback, ...rest } = props
  const [selected, setSelected] = useState<Option[]>((Array.isArray(response) && response) || []);

  const onToggleChip = (option: Option, isChecked: boolean) => {
    let updated = [...selected]

    if (!isChecked) {
      updated = updated.filter((value) => value.id !== option.id)
    } else {
      updated.push(option)
    }
    setSelected(updated)
    responseCallback(updated)
  }

  const isChipChecked = (option: Option) => {
    return (Array.isArray(response) && ((response.findIndex((value) => value.id === option.id) > -1)))
  }

  return (
    <View {...rest}>
      <QuestionDescription
        isRequired={question.isRequired}
        additionalInfo={question.additionalInfo}
      >
        {question.description}
      </QuestionDescription>
      <View style={styles.chipContainer}>
        {options.map((opt) => (
          <CustomChip 
            key={opt.id} 
            initialChecked={isChipChecked(opt)}
            onPress={(e, isChecked) => {
            onToggleChip(opt, isChecked)
          }}>
            {opt.name}
          </CustomChip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    marginTop: 16
  },
});

export default MultipleResponseTagQuestion;
