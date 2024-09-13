import palettes from '../themes/palettes';
// import React from 'react';
// import { Button } from '@draftbit/ui';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import * as GlobalVariables from '../config/GlobalVariableContext';

// WebBrowser.maybeCompleteAuthSession();

// export const Index = ({ theme, setUser }) => {
//   const [accessToken, setAccessToken] = React.useState(null);
//   const [type, setType] = React.useState(null);

//   const variables = GlobalVariables.useValues();
//   const setGlobalVariableValue = GlobalVariables.useSetValue();

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId: "347895797060-p3jllac8tda68aklk4n9h2iapbrdgbca.apps.googleusercontent.com",
//     androidClientId: "347895797060-c0rel2b8704c8pqkicf8mrfvme82jjng.apps.googleusercontent.com",
//     expoClientId: "347895797060-6qp29r47so49f7jid72isgtvq9ll0u8u.apps.googleusercontent.com",
//     webClientId: "347895797060-amgc9ntrnjspq7lt0p4nf7jhfi2f2bve.apps.googleusercontent.com",
//     redirectUri: "com.draftbit.playground://",
//     scopes: [
//       "https://www.googleapis.com/auth/gmail.readonly"
//     ]
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
//       }
//     }
//   }, [type]);

//   React.useEffect(() => {
//     if (accessToken) {
//       const handler = async () => {
//         try {
//           const response = await fetch(
//             `https://xc2f-7qct-imlz.n7d.xano.io/api:F-fsC2GI/auth/google?token=${accessToken}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );
//           const responseJson = await response.json();
//           const { authToken, user } = responseJson;
//           setUser(user);
//         } catch (err) {
//           console.error(err);
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
//         promptAsync({ useProxy: false, showInRecents: true });
//       }}
//       style={{
//         backgroundColor: palettes.App['Custom #ffffff'],
//         borderColor: palettes.App['Primary Blue'],
//         borderWidth: 1,
//         color: palettes.App['Primary Blue'],
//         fontFamily: 'Poppins_300Light',
//         fontSize: 16,
//         height: 44,
//       }}
//       icon="AntDesign/google"
//       title={'Google'}
//     />
//   );
// }
