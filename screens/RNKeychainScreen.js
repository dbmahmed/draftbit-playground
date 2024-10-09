import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import Purchases from 'react-native-purchases';
import * as CustomCode from '../custom-files/CustomCode';
import * as KeychainImpl from '../custom-files/KeychainImpl';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';

const RNKeychainScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}></ScreenContainer>
  );
};

export default withTheme(RNKeychainScreen);
