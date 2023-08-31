import React from 'react';
import * as AzureAuth from '../custom-files/AzureAuth';
import * as CustomCode from '../custom-files/CustomCode';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useWindowDimensions } from 'react-native';

const AzureAuthScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { justifyContent: 'center' },
        dimensions.width
      )}
      hasSafeArea={false}
      scrollable={false}
    >
      <Utils.CustomCodeErrorBoundary>
        <AzureAuth.App />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AzureAuthScreen);
