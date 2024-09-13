import React from 'react';
import {
  Button,
  Link,
  ScreenContainer,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Purchases from 'react-native-purchases';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const TestAutofillMarufScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      return;
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <KeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        contentContainerStyle={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center' },
          dimensions.width
        )}
      >
        {/* Header */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          {/* Title */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 36,
                fontWeight: '600',
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Welcome Back!'}
          </Text>
          {/* Subtitle */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {'Sign in to your account to continue'}
          </Text>
        </View>
        {/* Login Form */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 24, paddingLeft: 36, paddingRight: 36 },
            dimensions.width
          )}
        >
          {/* Error Message */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.background.danger,
                fontSize: 12,
                marginBottom: 16,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {null}
          </Text>
          {/* Email Input */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            webShowOutline={true}
            autoComplete={'username'}
            keyboardType={'email-address'}
            placeholder={'Email'}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.border.brand,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            textContentType={'emailAddress'}
          />
          <Spacer left={8} right={8} bottom={12} top={12} />
          {/* Password Input */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            webShowOutline={true}
            autoComplete={'current-password'}
            placeholder={'Password'}
            secureTextEntry={true}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.border.brand,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
          />
          <Spacer left={8} right={8} bottom={24} top={24} />
          {/* Sign In Button */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                showAlertUtil({
                  title: 'Done',
                  message: undefined,
                  buttonText: undefined,
                });
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.branding.primary,
                borderRadius: 8,
                fontFamily: 'System',
                fontWeight: '700',
                paddingBottom: 16,
                paddingTop: 16,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Sign in'}
          >
            {'Sign Up'}
          </Button>
          <Spacer left={8} right={8} bottom={16} top={16} />
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12,
              },
              dimensions.width
            )}
          >
            <Text accessible={true}>{'New User?'}</Text>
            <Spacer bottom={8} top={8} left={2} right={2} />
            {/* Sign Up Link */}
            <Link
              accessible={true}
              style={StyleSheet.applyWidth(
                { color: theme.colors.branding.primary },
                dimensions.width
              )}
              title={'Sign up!'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(TestAutofillMarufScreen);
