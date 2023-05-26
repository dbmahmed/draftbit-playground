import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as AuthComponents from '../custom-files/AuthComponents';
import * as CustomCode from '../custom-files/CustomCode';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, Icon, ScreenContainer, withTheme } from '@draftbit/ui';
import { Platform, Text, View, useWindowDimensions } from 'react-native';

const AuthButtonsScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <View
        style={StyleSheet.applyWidth({ flex: 1, margin: 20 }, dimensions.width)}
      >
        <>
          {!(Platform.OS === 'ios') ? null : (
            <Utils.CustomCodeErrorBoundary>
              <AuthComponents.AppleLogin
                navigation={props.navigation}
                theme={props.theme}
              />
            </Utils.CustomCodeErrorBoundary>
          )}
        </>
        <Utils.CustomCodeErrorBoundary>
          <AuthComponents.FacebookLogin
            navigation={props.navigation}
            theme={props.theme}
            setErrorMessage={console.log}
          />
        </Utils.CustomCodeErrorBoundary>
        {/* LoggedInView */}
        <>
          {!Constants['user'] ? null : (
            <View>
              <Text
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {'--- Logged in ---\n'}
              </Text>
              {/* Email */}
              <Text
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {'Email : '}
                {Constants['user']?.email}
                {'\n'}
              </Text>
              {/* Name */}
              <Text
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {'Name : '}
                {Constants['user']?.name}
                {'\n'}
              </Text>
              {/* Token */}
              <Text
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {'Token : '}
                {JSON.stringify(Constants['auth_token'])}
              </Text>
              <Button
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'user',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'auth_token',
                      value: '',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  GlobalStyles.ButtonStyles(theme)['Button'],
                  dimensions.width
                )}
                title={'Logout\n'}
              />
            </View>
          )}
        </>
        <Text
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Text'],
            dimensions.width
          )}
        >
          {JSON.stringify(Constants['newuser'])}
          {'\n'}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(AuthButtonsScreen);
