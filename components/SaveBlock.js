import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, TextInput, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';

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
          allowFontScaling={true}
          autoCapitalize={'none'}
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
          style={StyleSheet.applyWidth(
            GlobalStyles.TextInputStyles(theme)['Text Input'],
            dimensions.width
          )}
          value={textInputValue}
        />
      </View>
      <Button
        onPress={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
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
