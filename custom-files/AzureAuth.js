// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import {
//   exchangeCodeAsync,
//   makeRedirectUri,
//   useAuthRequest,
//   useAutoDiscovery,
//   Prompt
// } from 'expo-auth-session';
// import { Button, Text, SafeAreaView, Platform } from 'react-native';
// import * as GlobalVariables from '../config/GlobalVariableContext'

// WebBrowser.maybeCompleteAuthSession();

// function App({ route }) {

//   const setGlobalVariableValue = GlobalVariables.useSetValue();
//   const Variables = GlobalVariables.useValues();
//   // Endpoint
//   const discovery = useAutoDiscovery(
//     `${Variables.AZURE_BRANDED_URL}/tfp/${Variables.AZURE_PROJECT_ID}/b2c_1a_signin/v2.0`,
//   );
//   const redirectUri = Platform.OS === 'ios' ? Variables.AZURE_REDIRECT_URL : makeRedirectUri({
//     scheme: undefined,
//     path: 'LoginScreen',
//   });

//   const clientId = Platform.OS === 'ios' ? Variables.AZURE_CLIENT_ID : Variables.AZURE_ANDROID_CLIENT_ID;

//   // We store the JWT in here
//   const [token, setToken] = React.useState(null);

//   // Request
//   const [request, _, promptAsync] = useAuthRequest(
//     {
//       clientId,
//       scopes: ['openid', 'profile', 'email', 'offline_access'],
//       redirectUri: redirectUri,
//       prompt: Prompt.Login
//     },
//     discovery,
//   );

//   return (
//     <SafeAreaView>
//       <Button
//         disabled={!request}
//         title="Login"
//         onPress={() => {
//           promptAsync().then((codeResponse) => {
//             console.log('code response', codeResponse)
//             if (request && codeResponse?.type === 'success' && discovery) {
//               console.log('exchanging code attempt')
//               exchangeCodeAsync(
//                 {
//                   clientId,
//                   code: codeResponse.params.code,
//                   extraParams: request.codeVerifier
//                     ? { code_verifier: request.codeVerifier }
//                     : undefined,
//                   redirectUri: redirectUri,
//                 },
//                 discovery,
//               ).then((res) => {
//                 console.log('exchange response', res)
//                 setToken(res.idToken);

//               }).catch(err => {
//                 console.log('error ', err.message)
//               });
//             }
//           });
//         }}
//       />
//       <Text>{token}</Text>
//     </SafeAreaView>
//   );
// }
// export { App }
