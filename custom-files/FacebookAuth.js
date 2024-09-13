// This import is required if you are defining react components in this module.
import React from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.

// need to add them in app.json
// [
//         "react-native-fbsdk-next",
//         {
//           "appID": "376508554703879",
//           "clientToken": "70c077e17d5953d39d6510c6f5887a9a",
//           "displayName": "First app",
//           "scheme": "fb376508554703879",
//           "advertiserIDCollectionEnabled": false,
//           "autoLogAppEventsEnabled": false,
//           "isAutoInitEnabled": true,
//           "iosUserTrackingPermission": "This identifier will be used to deliver personalized ads to you."
//         }
//       ],
//       "expo-tracking-transparency"

import { Button, StyleSheet, View } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk-next';

export const Index = () => {
  const getData = () => {
    const infoRequest = new GraphRequest('/me', null, (error, result) => {
      console.log(error || result);
    });
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  return (
    <View style={styles.container}>
      <LoginButton
        onLogoutFinished={() => console.log('Logged out')}
        onLoginFinished={(error, data) => {
          console.log(error || data);
          AccessToken.getCurrentAccessToken().then(data => console.log(data));
        }}
      />
      <Button title="Get Data" onPress={getData} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
