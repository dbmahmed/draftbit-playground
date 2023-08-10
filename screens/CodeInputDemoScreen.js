import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  CodeInput,
  CodeInputCell,
  CodeInputText,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useWindowDimensions } from 'react-native';

const CodeInputDemoScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  const [codeInput2Value, setCodeInput2Value] = React.useState('');
  const [codeInputValue, setCodeInputValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <CodeInput
        onInputFull={finalValue => {
          const codeInputValue = finalValue;
          try {
          } catch (err) {
            console.error(err);
          }
        }}
        onChangeText={newCodeInputValue => {
          const codeInputValue = newCodeInputValue;
          try {
            setCodeInputValue(newCodeInputValue);
          } catch (err) {
            console.error(err);
          }
        }}
        blurOnFull={true}
        cellCount={4}
        changeTextDelay={500}
        clearOnCellFocus={true}
        keyboardType={'number-pad'}
      />
      {/* Code Input 2 */}
      <CodeInput
        onInputFull={finalValue => {
          const codeInputValue = finalValue;
          try {
          } catch (err) {
            console.error(err);
          }
        }}
        onChangeText={newCodeInput2Value => {
          const codeInputValue = newCodeInput2Value;
          try {
            setCodeInput2Value(newCodeInput2Value);
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth({ marginTop: 30 }, dimensions.width)}
        blurOnFull={true}
        cellCount={6}
        changeTextDelay={500}
        clearOnCellFocus={true}
        keyboardType={'number-pad'}
      >
        <CodeInputCell
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.CodeInputCellStyles(theme)['Code Input Cell'],
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Primary'],
                borderRadius: 15,
                height: 70,
                justifyContent: 'center',
              }
            ),
            dimensions.width
          )}
        >
          <CodeInputText
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Background'],
                fontFamily: 'AdventPro_400Regular',
                fontSize: 20,
              },
              dimensions.width
            )}
            isFocused={isFocused}
            cursorBlinkDuration={500}
            cursorText={'|'}
          />
        </CodeInputCell>
      </CodeInput>
    </ScreenContainer>
  );
};

export default withTheme(CodeInputDemoScreen);
