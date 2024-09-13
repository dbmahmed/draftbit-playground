import palettes from '../themes/palettes';
// import React from 'react';
// import { Touchable, Button } from '@draftbit/ui';
// import { Alert, View, Text } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as WebBrowser from 'expo-web-browser';
// import * as GlobalVariables from '../config/GlobalVariableContext';

// import jwtDecode from 'jwt-decode';

// WebBrowser.maybeCompleteAuthSession();

// export function GoogleLogin({ theme, navigation, setErrorMessage }) {
//   const [accessToken, setAccessToken] = React.useState(null);
//   const [type, setType] = React.useState(null);

//   const variables = GlobalVariables.useValues();
//   const setGlobalVariableValue = GlobalVariables.useSetValue();

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId: variables.GOOGLE_IOS_CLIENT_ID,
//     androidClientId: variables.GOOGLE_ANDROID_CLIENT_ID,
//     expoClientId: variables.GOOGLE_IOS_CLIENT_ID,
//   });

//   React.useEffect(() => {
//     if (response) {
//       setType(response.type);
//     }
//   }, [response]);

//   React.useEffect(() => {
//     if (type) {
//       if (type === 'success') {
//         setAccessToken(response.authentication.accessToken);
//       } else {
//         setErrorMessage('Error: Could not receive access token');
//       }
//     }
//   }, [type]);

//   React.useEffect(() => {
//     if (accessToken) {
//       const handler = async () => {
//         try {
//           //TODO REPLACE THIS
//           const loginResponse = await fetch(
//             `https://x8x4-ck6z-yoac.n7.xano.io/api:U0aE1wpF/oauth/google/?token=${accessToken}`
//           );
//           const data = await loginResponse.json();
//           const token = data?.auth_token;
//           const errorMessage = data?.message;
//           setErrorMessage(errorMessage);

//           setGlobalVariableValue({
//             key: 'AUTHORIZATION_HEADER',
//             value: 'Bearer ' + token,
//           });
//           setGlobalVariableValue({
//             key: 'USER_DETAILS',
//             value: data?.user,
//           });

//           // if(!data?.user?._profile?.name || !data?.user?._profile?.handle)
//           //   navigation.navigate('CompleteOnboarding')
//           // else
//           //   navigation.navigate('Homescreen')
//         } catch (err) {
//           console.error(err);
//           setErrorMessage(err);
//         }
//       };
//       handler();
//     } else {
//       return;
//     }
//   }, [accessToken]);

//   return (
//     <Button
//       onPress={() => {
//         try {
//           promptAsync({ useProxy: false, showInRecents: true });
//         } catch (err) {
//           setErrorMessage(err);
//         }
//       }}
//       style={{
//         backgroundColor: palettes.App['Custom #ffffff'],
//         borderColor: palettes.App['Primary Blue'],
//         borderWidth: 1,
//         color: palettes.App['Primary Blue'],
//         fontFamily: 'Poppins_300Light',
//         fontSize: 16,
//         height: 44,
//         marginTop: 16,
//       }}
//       icon="AntDesign/google"
//       title={'Google'}
//     />
//   );
// }

// export function FacebookLogin({ theme, navigation, setErrorMessage }) {
//   const variables = GlobalVariables.useValues();
//   const setGlobalVariable = GlobalVariables.useSetValue();

//   const [request, response, promptAsync] = Facebook.useAuthRequest({
//     clientId: variables.FACEBOOK_APP_ID,
//     scopes: ['public_profile', 'email'],
//   });

//   React.useEffect(() => {
//     console.log(response);
//     if (response && response.type === 'success' && response.authentication) {
//       const { access_token } = response.params;

//       (async () => {
//         const userInfoResponse = await fetch(
//           `https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,email,first_name,last_name`
//         );
//         const userInfo = await userInfoResponse.json();
//         console.log(userInfo);
//         setGlobalVariable({ key: 'user', value: userInfo });
//       })();

//       // You can now use the access token to make API calls
//       // For example: fetch(`https://graph.facebook.com/me?access_token=${access_token}`)
//     }
//   }, [response]);

//   return (
//     <Button
//       onPress={() => {
//         try {
//           promptAsync({ useProxy: false, showInRecents: true });
//         } catch (err) {
//           setErrorMessage(err);
//         }
//       }}
//       style={{
//         backgroundColor: palettes.App['Custom #ffffff'],
//         borderColor: palettes.App['Primary Blue'],
//         borderWidth: 1,
//         color: palettes.App['Primary Blue'],
//         fontFamily: 'Poppins_300Light',
//         fontSize: 16,
//         height: 44,
//         marginTop: 16,
//       }}
//       icon="AntDesign/facebook-square"
//       title={'Facebook'}
//     />
//   );
// }

// export function FacebookLoginWrapper({ children }) {
//   const variables = GlobalVariables.useValues();

//   const [request, response, promptAsync] = Facebook.useAuthRequest({
//     clientId: variables.FACEBOOK_APP_ID,
//     scopes: ['public_profile', 'email'],
//   });

//   React.useEffect(() => {
//     console.log(response);
//     if (response && response.type === 'success' && response.authentication) {
//       const { access_token } = response.params;

//       (async () => {
//         const userInfoResponse = await fetch(
//           `https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,email`
//         );
//         const userInfo = await userInfoResponse.json();
//         console.log(userInfo);
//       })();

//       // You can now use the access token to make API calls
//       // For example: fetch(`https://graph.facebook.com/me?access_token=${access_token}`)
//     }
//   }, [response]);

//   return (
//     <Touchable
//       onPress={() => {
//         try {
//           promptAsync({ useProxy: false, showInRecents: true });
//         } catch (err) {
//           setErrorMessage(err);
//         }
//       }}
//     >
//       {children}
//     </Touchable>
//   );
// }

// export function AppleLogin({ theme, navigation }) {
//   const setGlobalVariable = GlobalVariables.useSetValue();

//   const [appleAuthAvailable, setAppleAuthAvailable] = React.useState(false);
//   const [token, setToken] = React.useState();

//   React.useEffect(() => {
//     const checkAvailable = async () => {
//       const isAvailable = await AppleAuthentication.isAvailableAsync();
//       setAppleAuthAvailable(isAvailable);
//     };
//     checkAvailable();
//   }, []);

//   const login = async () => {
//     try {
//       console.log('login clicked');
//       const credential = await AppleAuthentication.signInAsync({
//         requestedScopes: [
//           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//           AppleAuthentication.AppleAuthenticationScope.EMAIL,
//         ],
//       });
//       console.log('creds', credential);

//       const decoded = jwtDecode(credential.identityToken);
//       setToken(JSON.stringify({credential, decoded: decoded}));

//       console.log(JSON.stringify(decoded));
//       setGlobalVariable({ key: 'auth_token', value: credential });
//        setGlobalVariable({ key:'user', value :decoded});

//     } catch (e) {
//       console.log('234', JSON.stringify(e));
//     }
//   };

//   return (
//     <View>
//       {appleAuthAvailable ? (
//         <View>
//           <Button
//             onPress={login}
//             style={{
//               backgroundColor: palettes.App['Custom #ffffff'],
//               borderColor: palettes.App['Primary Blue'],
//               borderWidth: 1,
//               color: palettes.App['Primary Blue'],
//               fontFamily: 'Poppins_300Light',
//               fontSize: 16,
//               height: 44,
//               marginTop: 16,
//             }}
//             disabled={!appleAuthAvailable}
//             icon="AntDesign/apple1"
//             title={'Apple'}
//           />
//           <Text>{JSON.stringify(token)}</Text>
//         </View>
//       ) : (
//         <Text>Apple auth unavailable</Text>
//       )}
//     </View>
//   );
// }
