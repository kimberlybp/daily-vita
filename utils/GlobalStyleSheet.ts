import { Colours } from '@/constants/Colours';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rootText: {
    color: Colours.text,
    fontFamily: 'Poppins Regular',
    fontSize: 18,
  },
  error: {
    color: Colours.error
  },
  bottomButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  bottom: {
    width: '100%',
    bottom: 0,
    position: 'absolute'
  }
});

export default styles
