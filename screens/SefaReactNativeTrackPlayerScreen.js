import React from 'react';
import * as CustomCode from '../custom-files/CustomCode';
import * as MusicPlayer from '../custom-files/MusicPlayer';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const SefaReactNativeTrackPlayerScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <MusicPlayer.MusicPlayer />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(SefaReactNativeTrackPlayerScreen);
