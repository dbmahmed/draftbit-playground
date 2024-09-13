import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import Purchases from 'react-native-purchases';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { data: null };

const RevenueCatProductBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [isLoading, setIsLoading] = props.setIsLoading
    ? [
        props.isLoading !== undefined ? props.isLoading : false,
        props.setIsLoading,
      ]
    : React.useState(false);

  return (
    <View>
      <Touchable
        onPress={() => {
          const handler = async () => {
            try {
              setIsLoading(true);
              const purchaseResult = await Purchases.purchasePackage(
                props.data ?? defaultProps.data
              );
              setIsLoading(false);

              showAlertUtil({
                title: undefined,
                message: JSON.stringify(purchaseResult),
                buttonText: undefined,
              });
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
      >
        <View>
          {/* Text 2 */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Text'].style,
              dimensions.width
            )}
          >
            {'Basic Monthly'}
          </Text>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Text'].style,
              dimensions.width
            )}
          >
            {(props.data ?? defaultProps.data)?.product?.priceString}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(RevenueCatProductBlock);
