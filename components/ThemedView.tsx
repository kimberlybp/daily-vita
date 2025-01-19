import { Colours } from '@/constants/Colours';
import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & PropsWithChildren

const ThemedView = (props: ThemedViewProps) => {
  const { children, ...rest } = props
  return (
    <View style={styles.root} {...rest}>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colours.background,
  },
  container: {
    flex: 1,
    marginVertical: '20%',
    marginHorizontal: 24,
  },
});

export default ThemedView;
