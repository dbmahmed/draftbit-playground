import React from 'react';
import { Button, TextInput, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
import Purchases from 'react-native-purchases';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const SaveBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [textInputValue, setTextInputValue] = React.useState('');
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

  return (
    <View
      style={StyleSheet.applyWidth(
        { flexDirection: 'row', height: 48, justifyContent: 'space-between' },
        dimensions.width
      )}
    >
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, height: 48, justifyContent: 'center' },
          dimensions.width
        )}
      >
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newTextInputValue => {
            const textInputValue = newTextInputValue;
            try {
              setTextInputValue(newTextInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          placeholder={'Enter a value...'}
          webShowOutline={true}
          {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextInputStyles(theme)['Text Input'].style,
            dimensions.width
          )}
          value={textInputValue}
        />
      </View>
      <Button
        iconPosition={'left'}
        onPress={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}
        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'].style, {
            marginLeft: 5,
          }),
          dimensions.width
        )}
        title={'Send'}
      />
    </View>
  );
};

export default withTheme(SaveBlock);
