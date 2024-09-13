import React from 'react';
import {
  AvoidKeyboardView,
  Button,
  Link,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Purchases from 'react-native-purchases';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as ExampleDataApi from '../apis/ExampleDataApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import useWindowDimensions from '../utils/useWindowDimensions';

const BlankScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [num, setNum] = React.useState(0);
  const [showSheet, setShowSheet] = React.useState(false);
  const [test, setTest] = React.useState('50');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [token, setToken] = React.useState('');
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      navigation.navigate('MapClusterDemoScreen');
    }
  }, [lastNotificationResponse]);

  React.useEffect(() => {
    const tOH = setTimeout(() => {
      console.log('nav param in useEffect', props.route?.params?.code);
      setNavBeta(props.route?.params?.beta + 'ext');
    }, 100);

    return () => clearTimeout(tOH);
  }, []);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Text 2 */}
      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['Text'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
            fontFamily: 'Aclonica_400Regular',
          }),
          dimensions.width
        )}
      >
        {'This is some text'}
      </Text>
      {/* Text 3 */}
      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['Text'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'].style,
          dimensions.width
        )}
      >
        {'this is system font'}
      </Text>
      {/* Text 4 */}
      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['Text'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
            fontFamily: 'Barriecito_400Regular',
          }),
          dimensions.width
        )}
      >
        {'another text font'}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
