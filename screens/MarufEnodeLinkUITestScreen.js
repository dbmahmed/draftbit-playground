import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import * as ExtraPackages from '../custom-files/ExtraPackages';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';

const MarufEnodeLinkUITestScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const triggerEnodeOnboard = token => {
    ExtraPackages.ExpoEnodeLinkSDK.show(token);
  };
  React.useEffect(() => {
    const resultListener = ExtraPackages.ExpoEnodeLinkSDK.listenToResult(
      (code, errorMessage) => {
        // Add your code here to handle the result
        console.log({ code, errorMessage });
      }
    );
    return () => resultListener.remove();
  }, []);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <Button
        onPress={() => {
          try {
            triggerEnodeOnboard(Constants['ENODE_LINK_UI_TOKEN']);
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
            marginTop: 18,
          }),
          dimensions.width
        )}
        title={'Start Enode Onboarding'}
      />
    </ScreenContainer>
  );
};

export default withTheme(MarufEnodeLinkUITestScreen);
