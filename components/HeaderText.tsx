import globalStyles from '@/utils/GlobalStyleSheet';
import { CommonTextProps } from '@/utils/GlobalTypes';
import React from "react";
import { StyleSheet, Text } from 'react-native';

const HeaderText = (props: CommonTextProps) => {
  const { children, style, ...rest } = props
  return (
    <Text style={[globalStyles.rootText, styles.titleText, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 32,
    marginBottom: 16,
  },
});

export default HeaderText;
