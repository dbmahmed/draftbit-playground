import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { ImageBackground } from 'react-native';

const MarufTestImageBGScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [imgUri, setImgUri] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        source={{ uri: `${imgUri}` }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'],
            { alignItems: 'center', justifyContent: 'center' }
          ),
          dimensions.width
        )}
      >
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const imageResult = await openImagePickerUtil({
                  mediaTypes: 'Images',
                  allowsEditing: false,
                  quality: 0.2,
                });

                setImgUri(imageResult);
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
          title={'Get Started'}
        />
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(MarufTestImageBGScreen);
