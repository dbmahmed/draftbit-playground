import * as React from 'react';
import { Icon, Provider as ThemeProvider } from '@draftbit/ui';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  ActivityIndicator,
  AppState,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import Purchases from 'react-native-purchases';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './AppNavigator';
import Fonts from './config/Fonts.js';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import * as ExternalPackages from './custom-files/ExternalPackages';
import Draftbit from './themes/Draftbit';
import useIsOnline from './utils/useIsOnline';

// import { Settings } from 'react-native-fbsdk-next';
// import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

// import TrackPlayer from 'react-native-track-player'
// TrackPlayer.registerPlaybackService(() => require('./custom-files/services'));

const App = () => {
  const [areAssetsCached, setAreAssetsCached] = React.useState(false);

  const [fontsLoaded] = useFonts({
    Aclonica_400Regular: Fonts.Aclonica_400Regular,
    Barriecito_400Regular: Fonts.Barriecito_400Regular,
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAreAssetsCached(true);
      }
    }

    prepare();
  }, []);

  const isOnline = useIsOnline();

  const isReady = areAssetsCached && fontsLoaded;
  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  // React.useEffect(() => {

  //         const requestTracking = async () => {
  //                 const { status } = await requestTrackingPermissionsAsync();

  //                 Settings.initializeSDK();

  //                 if (status === "granted") {
  //                         await Settings.setAdvertiserTrackingEnabled(true);
  //                 }
  //         };

  //         requestTracking();
  // }, [])

  // const featureClient = new ExternalPackages.ReactNativeLDClient(
  //   'mob-c992a1d6-5985-4bd8-8c3f-523b6938eaa1',
  //   ExternalPackages.AutoEnvAttributes.Enabled,
  //   {
  //     debug: true,
  //     applicationInfo: {
  //       id: 'ld-rn-test-app',
  //       version: '0.0.1',
  //     },
  //   },
  // )

  React.useEffect(() => {
    async function initRevenueCat() {
      if (Platform.OS == 'android') {
        await Purchases.configure({ apiKey: '' });
      } else {
        await Purchases.configure({
          apiKey: 'appl_ykoXtgdaPnVqLrlygZcqyIpVGlV',
        });
      }
    }
    initRevenueCat();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            themes={[Draftbit]}
            breakpoints={{}}
            initialThemeName={Draftbit.name}
          >
            {!isOnline ? (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 12,
                }}
              >
                <Icon
                  name="MaterialCommunityIcons/cloud-off-outline"
                  size={80}
                  color="white"
                />
                <Text style={{ fontSize: 20, marginTop: 20, color: 'white' }}>
                  Your device has lost connection to the internet. This app may
                  not function as expected until you reconnect.
                </Text>
              </View>
            ) : null}

            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  );
};

export default App;
