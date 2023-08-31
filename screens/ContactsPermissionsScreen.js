import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, useWindowDimensions } from 'react-native';

const ContactsPermissionsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const checkContactPermission = async () => {
    console.log('check permissions');

    const { status } = await CustomCode.Contacts.requestPermissionsAsync();
    console.log('status', status);
    setResult(status);
    if (status === 'granted') {
      const { data } = await CustomCode.Contacts.getContactsAsync({
        fields: [
          CustomCode.Contacts.Fields.ID,
          CustomCode.Contacts.Fields.Image,
          CustomCode.Contacts.Fields.FirstName,
          CustomCode.Contacts.Fields.LastName,
          CustomCode.Contacts.Fields.PhoneNumbers,
          CustomCode.Contacts.Fields.Emails,
          CustomCode.Contacts.Fields.Birthday,
          CustomCode.Contacts.Fields.Addresses,
        ],
      });

      return data;
    } else {
      alert('Contact permission was not granted');
    }
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await checkContactPermission();
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);
  const [result, setResult] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View
        style={StyleSheet.applyWidth({ flex: 1, margin: 20 }, dimensions.width)}
      >
        {/* result */}
        <Text
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Text'],
            dimensions.width
          )}
        >
          {'status: '}
          {result}
        </Text>
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                await checkContactPermission();
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            GlobalStyles.ButtonStyles(theme)['Button'],
            dimensions.width
          )}
          title={'Check Permissions\n'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ContactsPermissionsScreen);
