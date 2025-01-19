import globalStyles from '@/utils/GlobalStyleSheet';
import { CommonTextProps } from '@/utils/GlobalTypes';
import React from "react";
import { StyleSheet, Text, TextProps } from 'react-native';

export type QuestionDescriptionProps = CommonTextProps & {
  additionalInfo?: string
  isRequired?: boolean
}

const QuestionDescription = (props: QuestionDescriptionProps) => {
  const { children, style, additionalInfo, isRequired, ...rest } = props
  return (
    <Text style={[globalStyles.rootText, styles.text, style]} {...rest}>
      {children}
      {isRequired && (<Text style={globalStyles.error}>*</Text>)}
      {additionalInfo}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins Regular',
    fontSize: 22,
  },
});

export default QuestionDescription;
