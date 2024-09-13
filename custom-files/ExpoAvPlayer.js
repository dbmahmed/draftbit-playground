// import * as React from 'react';
// import { View, Button } from 'react-native';
// import { Audio } from 'expo-av';

// export function Player() {
//   const [sound, setSound] = React.useState();

//   const initAudioMode = async () => {
//     await Audio.setAudioModeAsync({
//       staysActiveInBackground: true,
//       interruptionModeIOS: InterruptionModeIOS.DuckOthers,
//       interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
//       playsInSilentModeIOS: true,
//     });
//   };

//   React.useEffect(() => {
//     initAudioMode();
//   }, []);

//   async function playSound() {
//     console.log('Loading Sound');
//     //http://www.kiea.jp/hosenji.mp3
//     const { sound } = await Audio.Sound.createAsync(
//       { uri: 'http://www.kiea.jp/hosenji.mp3' },
//       { shouldPlay: true }
//     );
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync();
//   }

//   React.useEffect(() => {
//     return sound
//       ? () => {
//           console.log('Unloading Sound');
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   return (
//     <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'  }}>
//       <Button title="Play Sound" onPress={playSound} />
//     </View>
//   );
// }
