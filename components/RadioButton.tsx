import { Colours } from "@/constants/Colours";
import globalStyles from '@/utils/GlobalStyleSheet';
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";

export type RadioButtonProps = Omit<ViewProps, 'children'> & {
  children: string
  selected: boolean
  onPress?: (e: GestureResponderEvent) => void
}

const RadioButton = (props: RadioButtonProps) => {
  const { selected, style, children, onPress, ...rest } = props
  return (
    <View {...rest}>
      <TouchableOpacity style={styles.root} onPress={onPress}>
        <View style={[styles.outer, style]}>
          {selected ? <View style={styles.inner} /> : null}
        </View>
        <Text style={[globalStyles.rootText, styles.label]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  outer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colours.primary,
  },
  label: {
    fontFamily: 'Poppins SemiBold'
  }
});

export default RadioButton
