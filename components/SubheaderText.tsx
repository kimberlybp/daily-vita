import globalStyles from '@/utils/GlobalStyleSheet';
import { CommonTextProps } from '@/utils/GlobalTypes';
import React from "react";
import { StyleSheet, Text } from 'react-native';

const SubheaderText = (props: CommonTextProps) => {
  const { children, style, ...rest } = props
  return (
    <Text style={[globalStyles.rootText, styles.subheadingText, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subheadingText: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 20,
  },
});

export default SubheaderText;
