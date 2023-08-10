import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as ExampleDataApi from '../apis/ExampleDataApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const BlankScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  const [showSheet, setShowSheet] = React.useState(false);
  const [token, setToken] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ExampleDataApi.FetchProductsGET>
        {({ loading, error, data, refetchProducts }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <FlatList
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <Text
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text'],
                      dimensions.width
                    )}
                  >
                    {null}
                  </Text>
                );
              }}
              data={[]}
              listKey={'kln2zCJw'}
              keyExtractor={listData =>
                listData?.id || listData?.uuid || JSON.stringify(listData)
              }
              numColumns={1}
              onEndReachedThreshold={0.5}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            />
          );
        }}
      </ExampleDataApi.FetchProductsGET>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
