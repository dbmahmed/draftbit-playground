import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  MapMarker,
  MapMarkerCluster,
  MapMarkerClusterView,
  MapView,
} from '@draftbit/maps';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, useWindowDimensions } from 'react-native';

const MapClusterDemoScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <MapView
        style={StyleSheet.applyWidth(
          GlobalStyles.MapViewStyles(theme)['Map View'],
          dimensions.width
        )}
        longitude={70}
        latitude={70}
        apiKey={'AIzaSyBzktToWosjNgrrUawZnbslB9NSXSXCkwo'}
        autoClusterMarkers={true}
        autoClusterMarkersDistanceMeters={10000}
        customMapStyle={'Beautiful West Coast Villa'}
        loadingEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        showsPointsOfInterest={true}
        zoom={3}
        zoomEnabled={true}
      >
        <MapMarkerCluster>
          <MapMarker latitude={70} longitude={70} pinImageSize={50} />
          {/* Map Marker 2 */}
          <MapMarker latitude={70} longitude={70.5} pinImageSize={50} />
          {/* Map Marker 3 */}
          <MapMarker latitude={70} longitude={71} pinImageSize={50} />
          <MapMarkerClusterView
            renderItem={({ markerCount }) => {
              return (
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Background'],
                    }),
                    dimensions.width
                  )}
                >
                  {'Custom Cluster View ('}
                  {markerCount}
                  {')'}
                </Text>
              );
            }}
            style={StyleSheet.applyWidth(
              { backgroundColor: theme.colors['Secondary'], padding: 10 },
              dimensions.width
            )}
            zoomOnPress={true}
          />
        </MapMarkerCluster>
        <MapMarker
          title={'Title'}
          latitude={80}
          longitude={80}
          pinImageSize={50}
        />
        {/* Map Marker 2 */}
        <MapMarker
          title={'Title 2'}
          latitude={80}
          longitude={80.5}
          pinImageSize={50}
        />
      </MapView>
    </ScreenContainer>
  );
};

export default withTheme(MapClusterDemoScreen);
