import React from 'react';
import { ScreenContainer, SimpleStyleFlatList, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Purchases from 'react-native-purchases';
import * as GlobalStyles from '../GlobalStyles.js';
import RevenueCatProductBlock from '../components/RevenueCatProductBlock';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { Login: null };

const PaywallScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [Data, setData] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const testOfferings = await Purchases.getOfferings();
        setData(testOfferings?.current.availablePackages);
        const infoRes = await Purchases.getCustomerInfo();
        setUserData(infoRes);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Text'].style,
            dimensions.width
          )}
        >
          {JSON.stringify(props.route?.params?.Login ?? defaultProps.Login)}
        </Text>
      </View>
      {/* View 2 */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Text'].style,
            dimensions.width
          )}
        >
          {JSON.stringify(userData)}
          {'\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}
          {JSON.stringify(userData)}
          {'\n'}
        </Text>
      </View>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          { backgroundColor: palettes.App['Custom Color_12'], flex: 1 },
          dimensions.width
        )}
      >
        <SimpleStyleFlatList
          data={Data}
          horizontal={false}
          inverted={false}
          keyExtractor={(listData, index) =>
            listData?.id ??
            listData?.uuid ??
            index?.toString() ??
            JSON.stringify(listData)
          }
          keyboardShouldPersistTaps={'never'}
          listKey={'PmvYTMgU'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => {
            const listData = item;
            return (
              <>
                <RevenueCatProductBlock data={listData} />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    dimensions.width
                  )}
                >
                  {index}
                </Text>
              </>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(PaywallScreen);
