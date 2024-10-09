import React from 'react';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import Purchases from 'react-native-purchases';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const RevenueCatLoginScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [userData, setUserData] = React.useState({});

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'center' },
        dimensions.width
      )}
    >
      <Button
        iconPosition={'left'}
        onPress={() => {
          try {
            setIsLoading(true);
            const loginResult = Purchases.logIn(String(new Date()));
            /* hidden 'Set Variable' action */
            /* hidden 'Get Offerings (RevenueCat)' action */
            /* hidden 'Set Variable' action */
            setIsLoading(false);
            navigation.navigate('PaywallScreen', { Login: loginResult });
          } catch (err) {
            console.error(err);
          }
        }}
        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
        loading={isLoading}
        style={StyleSheet.applyWidth(
          GlobalStyles.ButtonStyles(theme)['Button'].style,
          dimensions.width
        )}
        title={'Login Revenue Cat'}
      />
    </ScreenContainer>
  );
};

export default withTheme(RevenueCatLoginScreen);
