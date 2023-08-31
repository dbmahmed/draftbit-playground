import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const App = () => {
  // Endpoint
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/72af634c-c338-4a00-8ace-6f5cca041d64/v2.0'
  );
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'dd3af25d-592e-490c-a236-53af182f825c',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      // redirectUri: makeRedirectUri({
      //   scheme: 'draftbit://BlankScreen'
      // }),
      redirectUri: 'draftbit-playground://AzureAuthScreen',
    },
    discovery
  );

  console.log(response);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};
