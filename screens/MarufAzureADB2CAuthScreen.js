import React from 'react';
import * as AzureAuth from '../custom-files/AzureAuth';
import * as CustomCode from '../custom-files/CustomCode';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const MarufAzureADB2CAuthScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <Utils.CustomCodeErrorBoundary>
        <AzureAuth.App />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(MarufAzureADB2CAuthScreen);
