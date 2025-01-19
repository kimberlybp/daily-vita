import { Colours } from '@/constants/Colours';
import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Chip, ChipProps } from 'react-native-paper';

export type CustomChipProps = Omit<ChipProps, 'onPress'> & {
  initialChecked?: boolean
  onPress?: (e: GestureResponderEvent, isChecked: boolean) => void
}


const CustomChip = (props: CustomChipProps) => {
  const { children, style, initialChecked, onPress, ...rest } = props
  const [checked, setChecked] = useState<boolean>(initialChecked || false);

  const onPressEvent = (e: GestureResponderEvent) => {
    const updated = !checked
    setChecked(updated)
    if (onPress) onPress(e, updated)
  }

  return (
    <Chip
      {...rest}
      style={[styles.chip, !checked ? styles.unselectedChip : styles.selectedChip]}
      textStyle={checked ? styles.selectedText : styles.unselectedText}
      onPress={onPressEvent}
    >
      {children}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    width: 'auto',
    borderWidth: 2,
    borderColor: Colours.primary,
  },
  unselectedChip: {
    backgroundColor: 'transparent',
  },
  selectedChip: {
    backgroundColor: Colours.primary,
  },
  unselectedText: {
    color: Colours.primary,
  },
  selectedText: {
    color: Colours.white,
  }
});

export default CustomChip;
