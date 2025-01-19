import { Href } from 'expo-router';

interface NavigationPathsType {
  ROOT: Href
  SURVEY: {
    HEALTH_CONCERNS: Href
    DIETS: Href
    // ALLERGIES: Href
    LIFESTYLE: Href
    COMPLETE: Href
  };
}

const NavigationPaths: NavigationPathsType = {
  ROOT: '/',
  SURVEY: {
    HEALTH_CONCERNS: '/(survey)/health-concerns',
    DIETS: '/(survey)/diets',
    LIFESTYLE: '/(survey)/lifestyle',
    COMPLETE: '/(survey)/thank-you',
  },
};


export default NavigationPaths;
