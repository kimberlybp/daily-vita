import { Colours } from '@/constants/Colours';
import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

// Define the ref type as React.Ref<Button> to forward the ref properly
const CustomButton = forwardRef<View, ButtonProps>((props, ref) => {
  const { children, style, labelStyle, mode, ...rest } = props;

  const buttonStyle = [
    style,
    mode === 'contained' && styles.containedButton,
  ];

  const buttonLabelStyle = [
    labelStyle,
    mode === 'text' && styles.textButtonLabel,
  ];

  return (
    <Button
      ref={ref}
      style={[styles.button, ...buttonStyle]}
      labelStyle={[styles.buttonLabel, ...buttonLabelStyle]}
      contentStyle={styles.buttonContent}
      mode={mode}
      {...rest}
    >
      {children}
    </Button>
  );
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 'auto',
    minWidth: 100,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    color: Colours.white,
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    width: 'auto',
  },
  containedButton: {
    backgroundColor: Colours.button,
  },
  textButtonLabel: {
    color: Colours.button,
  }
});

export default CustomButton;
