import CustomButton from "@/components/CustomButton";
import HeaderText from "@/components/HeaderText";
import SubheaderText from "@/components/SubheaderText";
import ThemedView from "@/components/ThemedView";
import { PROGRESS_PER_PAGE } from "@/constants/Common";
import NavigationPaths from "@/constants/NavigationPaths";
import { initialiseSurvey, updateProgressBar } from "@/store/actions.ts/survey";
import globalStyles from '@/utils/GlobalStyleSheet';
import { Link } from 'expo-router';
import React, { useEffect } from "react";
import { Image, StyleSheet, Text } from 'react-native';
import { useDispatch } from "react-redux";


const WelcomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseSurvey())
  }, [])

  const onNext = () => {
    dispatch(updateProgressBar(PROGRESS_PER_PAGE))
  }

  return (
    <ThemedView>
      <HeaderText>
        Welcome to DailyVita
      </HeaderText>
      <SubheaderText>
        Hello, we are here to make your life healthier and happier
      </SubheaderText>
      <Image
        style={styles.illustration}
        source={require('../assets/images/dailyvita-welcome.png')}
      />
      <Text style={globalStyles.rootText}>
        We will ask couple of questions to better understand your vitamin need.
      </Text>
      <Link href={NavigationPaths.SURVEY.HEALTH_CONCERNS} onPress={onNext} asChild>
        <CustomButton style={styles.button} mode="contained">
          Get started
        </CustomButton>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  illustration: {
    height: '50%',
    width: '100%',
    marginTop: '15%',
  },
  button: {
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
});

export default WelcomePage;