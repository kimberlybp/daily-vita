import CustomButton from "@/components/CustomButton";
import HeaderText from "@/components/HeaderText";
import SubheaderText from "@/components/SubheaderText";
import ThemedView from "@/components/ThemedView";
import NavigationPaths from "@/constants/NavigationPaths";
import { resetSurveyResponses } from "@/store/actions.ts/survey";
import { RootState } from '@/store/reducers';
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";



const ThankYouView = () => {
  const dispatch = useDispatch()
  const parsedResponse = useSelector((state: RootState) => state.survey.parsedResponses)

  const stringResponse = useMemo(() => {
    return JSON.stringify(parsedResponse, null, 2)
  }, [parsedResponse])

  const onPress = () => {
    dispatch(resetSurveyResponses())
  }

  return (
    <ThemedView>
      <HeaderText>
        Yay! You're done
      </HeaderText>
      <Image
        style={styles.illustration}
        source={require('../../assets/images/thankyou.png')}
      />
      <SubheaderText>
        Here's a copy of your responses
      </SubheaderText>
      <ScrollView>
        <Text style={styles.responsesText}>{stringResponse.toString()}</Text>
      </ScrollView>
      <Link href={NavigationPaths.ROOT} onPress={onPress} asChild>
        <CustomButton mode="contained">Back to the start</CustomButton>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  illustration: {
    height: '50%',
    width: '100%',
    marginTop: '15%',
  },
  responsesText: {
    fontFamily: 'Poppins Regular',
    marginVertical: 16
  }
});

export default ThankYouView
