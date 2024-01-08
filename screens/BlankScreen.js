import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as ExampleDataApi from '../apis/ExampleDataApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import useWindowDimensions from '../utils/useWindowDimensions';
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
import { Fetch } from 'react-request';

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
      <ImageBackground
        resizeMode={'cover'}
        source={{
          uri: 'https://static.draftbit.com/images/placeholder-image-background.png',
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'],
            { alignItems: 'center', justifyContent: 'space-evenly' }
          ),
          dimensions.width
        )}
      >
        <AvoidKeyboardView
          easing={'linear'}
          hideAnimationDuration={200}
          showAnimationDuration={200}
        >
          <Image
            resizeMode={'cover'}
            source={{
              uri: 'https://static.draftbit.com/images/placeholder-image.png',
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                height: 600,
                width: 300,
              }),
              dimensions.width
            )}
          />
          <Text
            selectable={true}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Text'],
              dimensions.width
            )}
          >
            {token}
          </Text>
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
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  const tokenResult = await getPushTokenUtil({
                    failMessage:
                      'Failed to get push token for push notification!',
                    deviceMessage:
                      'Must use physical device for Push Notifications',
                  });

                  setToken(tokenResult);
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
            title={'Get Token'}
          />
        </AvoidKeyboardView>
        <Link
          accessible={true}
          allowFontScaling={true}
          onPress={() => {
            try {
              navigation.navigate('AmitAKVScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'], {
              color: theme.colors['Surface'],
            }),
            dimensions.width
          )}
          title={'AKV'}
        />
        {/* Link 2 */}
        <Link
          accessible={true}
          allowFontScaling={true}
          onPress={() => {
            try {
              navigation.navigate('AmitKAVHeightScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'], {
              color: theme.colors['Surface'],
            }),
            dimensions.width
          )}
          title={'KAV - height'}
        />
        {/* Link 3 */}
        <Link
          accessible={true}
          allowFontScaling={true}
          onPress={() => {
            try {
              navigation.navigate('AmitKASVScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'], {
              color: theme.colors['Surface'],
            }),
            dimensions.width
          )}
          title={'KASV'}
        />
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
