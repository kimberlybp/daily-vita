import { Colours } from "@/constants/Colours";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { RootState } from '@/store/reducers';
import { useSelector } from "react-redux";

export default function RootLayout() {
  const progress = useSelector((state: RootState) => state.survey.progress)

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="health-concerns" />
        <Stack.Screen name="diets" />
        <Stack.Screen name="lifestyle" />
        <Stack.Screen name="thank-you" />
      </Stack>
      <ProgressBar style={styles.progress} fillStyle={styles.progressFill} progress={progress / 100} color={Colours.primary} />
    </>
  )
}

const styles = StyleSheet.create({
  progress: {
    height: 16,
    backgroundColor: Colours.background
  },
  progressFill: {
    borderRadius: 100
  }
});

