import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/Draftbit.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import AdmobScreen from './screens/AdmobScreen';
import AmitAKVScreen from './screens/AmitAKVScreen';
import AmitKASVScreen from './screens/AmitKASVScreen';
import AmitKAVHeightScreen from './screens/AmitKAVHeightScreen';
import BlankScreen from './screens/BlankScreen';
import MarufAzureADB2CAuthScreen from './screens/MarufAzureADB2CAuthScreen';
import MarufEnodeLinkUITestScreen from './screens/MarufEnodeLinkUITestScreen';
import MarufTestImageBGScreen from './screens/MarufTestImageBGScreen';
import NotificationsPermissionsScreen from './screens/NotificationsPermissionsScreen';
import SefaReactNativeTrackPlayerScreen from './screens/SefaReactNativeTrackPlayerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        initialRouteName="SefaReactNativeTrackPlayerScreen"
        screenOptions={{ headerMode: 'none' }}
      >
        <Stack.Screen
          name="NotificationsPermissionsScreen"
          component={NotificationsPermissionsScreen}
          options={{
            title: 'Notifications Permissions',
          }}
        />
        <Stack.Screen
          name="BlankScreen"
          component={BlankScreen}
          options={{
            title: 'Blank',
          }}
        />
        <Stack.Screen
          name="AmitAKVScreen"
          component={AmitAKVScreen}
          options={{
            title: 'Amit - AKV',
          }}
        />
        <Stack.Screen
          name="AmitKAVHeightScreen"
          component={AmitKAVHeightScreen}
          options={{
            title: 'Amit - KAV - height',
          }}
        />
        <Stack.Screen
          name="AmitKASVScreen"
          component={AmitKASVScreen}
          options={{
            title: 'Amit - KASV',
          }}
        />
        <Stack.Screen
          name="AdmobScreen"
          component={AdmobScreen}
          options={{
            title: 'Admob',
          }}
        />
        <Stack.Screen
          name="MarufAzureADB2CAuthScreen"
          component={MarufAzureADB2CAuthScreen}
          options={{
            title: 'Maruf - Azure AD B2C Auth',
          }}
        />
        <Stack.Screen
          name="SefaReactNativeTrackPlayerScreen"
          component={SefaReactNativeTrackPlayerScreen}
          options={{
            title: 'Sefa - ReactNativeTrackPlayer',
          }}
        />
        <Stack.Screen
          name="MarufEnodeLinkUITestScreen"
          component={MarufEnodeLinkUITestScreen}
          options={{
            title: 'Maruf - Enode Link UI Test',
          }}
        />
        <Stack.Screen
          name="MarufTestImageBGScreen"
          component={MarufTestImageBGScreen}
          options={{
            title: 'Maruf - Test Image BG',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
