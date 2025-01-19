import { Colours } from '@/constants/Colours';
import globalStyles from '@/utils/GlobalStyleSheet';
import React from "react";
import { StyleSheet } from 'react-native';
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";

const CustomCheckbox = (props: BouncyCheckboxProps) => {
  const { children, style, onPress, textStyle, iconStyle, innerIconStyle, ...rest } = props

  const onPressEvent = (isChecked: boolean) => {
    if (onPress) onPress(isChecked)
  }

  return (
    <BouncyCheckbox
      textStyle={[globalStyles.rootText, styles.checkboxTextOverride, textStyle]}
      iconStyle={[styles.checkboxOverride, iconStyle]}
      innerIconStyle={[styles.checkboxOverride, styles.checkboxInnerOverride, innerIconStyle]}
      onPress={onPressEvent}
      fillColor={Colours.primary}
      useBuiltInState
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'relative'
  },
  checkboxOverride: {
    borderRadius: 5,
  },
  checkboxInnerOverride: {
    borderWidth: 2,
  },
  checkboxTextOverride: {
    fontFamily: 'Poppins SemiBold',
    textDecorationLine: "none",
  }
});

export default CustomCheckbox;
