import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import BlankScreen from './screens/BlankScreen';
import CodeInputDemoScreen from './screens/CodeInputDemoScreen';
import ContactsPermissionsScreen from './screens/ContactsPermissionsScreen';
import MapClusterDemoScreen from './screens/MapClusterDemoScreen';
import NotificationsPermissionsScreen from './screens/NotificationsPermissionsScreen';
import Web3AuthDemoScreen from './screens/Web3AuthDemoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { borderTopColor: 'transparent' },
      }}
    >
      <Tab.Screen
        name="NotificationsPermissionsScreen"
        component={NotificationsPermissionsScreen}
        options={{
          title: 'Notifications Permissions',
        }}
      />
      <Tab.Screen
        name="ContactsPermissionsScreen"
        component={ContactsPermissionsScreen}
        options={{
          title: 'Contacts Permissions',
        }}
      />
      <Tab.Screen
        name="Web3AuthDemoScreen"
        component={Web3AuthDemoScreen}
        options={{
          title: 'Web3AuthDemo',
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="CameraPermissionsScreen"
      >
        <Stack.Screen
          name="BlankScreen"
          component={BlankScreen}
          options={{
            title: 'Blank',
          }}
        />
        <Stack.Screen
          name="CodeInputDemoScreen"
          component={CodeInputDemoScreen}
          options={{
            title: 'CodeInput Demo',
          }}
        />
        <Stack.Screen
          name="MapClusterDemoScreen"
          component={MapClusterDemoScreen}
          options={{
            title: 'Map Cluster Demo',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
