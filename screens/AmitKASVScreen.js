import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  KeyboardAvoidingView,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import * as Notifications from 'expo-notifications';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AmitKASVScreen = props => {
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

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Container */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        {/* Top */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* Header */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-end',
                flexDirection: 'row',
                height: 83,
                justifyContent: 'center',
                paddingBottom: 10,
              },
              dimensions.width
            )}
          >
            {/* Header */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Error'],
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 20,
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'Header'}
            </Text>
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={StyleSheet.applyWidth(
              { flex: 1, paddingLeft: 15, paddingRight: 15 },
              dimensions.width
            )}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={true}
          >
            {/* Messages */}
            <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
              <Text
                selectable={true}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {token}
              </Text>
            </View>
            {/* Input */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  height: 48,
                  justifyContent: 'space-between',
                },
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
                      setTextInputValue(textInputValue);
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
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    { marginLeft: 5 }
                  ),
                  dimensions.width
                )}
                title={'Send'}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
        {/* Bottom Tab */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', minHeight: 83, paddingBottom: 34 },
            dimensions.width
          )}
        >
          {/* Tab 1 */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flex: 1, paddingTop: 10 },
              dimensions.width
            )}
          >
            <Image
              resizeMode={'cover'}
              source={Images.DyHKkUpSYkiqPOa7KBuk}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                  height: 24,
                  width: 24,
                }),
                dimensions.width
              )}
            />
            {/* Label */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Error'],
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 10,
                  lineHeight: 16,
                  marginTop: 3,
                }),
                dimensions.width
              )}
            >
              {'Tab One'}
            </Text>
          </View>
          {/* Tab 2 */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flex: 1, paddingTop: 10 },
              dimensions.width
            )}
          >
            <Image
              resizeMode={'cover'}
              source={Images.AlertsActive}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                  height: 24,
                  width: 24,
                }),
                dimensions.width
              )}
            />
            {/* Label */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Error'],
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 10,
                  lineHeight: 16,
                  marginTop: 3,
                }),
                dimensions.width
              )}
            >
              {'Tab Two'}
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(AmitKASVScreen);
