// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Platform,
// } from 'react-native';
// import TrackPlayer, {
//   Capability,
//   State,
//   Event,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';
// import Slider from '@react-native-community/slider';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// TrackPlayer.registerPlaybackService(() => require('./services'));

// const podcasts = [
//   {
//     id: '1',
//     url: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/yZ7PgqAxx6W6RnBzSBCeyvlncVQ/EOVs4Q../Sanderson_Rebecca_Hope_The_last_queen_dragon_and_her_mysterious_missing_egg_act_1.mp3',
//     title: 'Act 1 - Hope: The Last Queen Dragon and her Mysterious Missing Egg',
//     artist: 'Rebecca Sanderson',
//     artwork: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/qzaWzEtBs9FEjNHQA2bd8Qba7gk/beSnYg../Sanderson_Rebecca_Gentleness_The_last_queen_dragon_and_her_mysterious_missing_egg_act_1_96x96.jpg',
//   }

// ];

// // const podcasts = [
// //   {
// //     id: '1',
// //     url: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/yZ7PgqAxx6W6RnBzSBCeyvlncVQ/EOVs4Q../Sanderson_Rebecca_Hope_The_last_queen_dragon_and_her_mysterious_missing_egg_act_1.mp3',
// //     title: 'Act 1 - Hope: The Last Queen Dragon and her Mysterious Missing Egg',
// //     artist: 'Rebecca Sanderson',
// //     artwork: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/qzaWzEtBs9FEjNHQA2bd8Qba7gk/beSnYg../Sanderson_Rebecca_Gentleness_The_last_queen_dragon_and_her_mysterious_missing_egg_act_1_96x96.jpg',
// //   },
// //   {
// //     id: '2',
// //     url: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/TicavlIGQbPSIog3Hp5YzL6fbIA/gS3wiA../Sanderson_Rebecca_Hope_The_last_queen_dragon_and_her_mysterious_missing_egg_act_2.mp3',
// //     title: 'Act 2 - Hope: The Last Queen Dragon and her Mysterious Missing Egg',
// //     artist: 'Rebecca Sanderson',
// //     artwork: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/fZmcQPUW4cDh79X4qFy7MSc0lsQ/nOflUQ../Sanderson_Rebecca_Gentleness_The_last_queen_dragon_and_her_mysterious_missing_egg_act_2_96x96.jpg',
// //   },
// //   {
// //     id: '3',
// //     url: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/g9wm_3dvPSKaIV0Pe10GEEjR_aU/w-YVYw../SteenAnna_The_Best_Christmas.mp3',
// //     title: 'The Best Christmas',
// //     artist: 'Anna Steen',
// //     artwork: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/SsN1q6Q4O1sfL8yTTfuJaI9HI2g/W0CMCw../SteenAnna_The_Best_Christmas_96.jpg',
// //   },
// //   {
// //     id: '4',
// //     url: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/E2uKPji2-y00BYeRk1_YtYKu6pw/vNDiHQ../Washington_Donna_Peter_Piper.mp3',
// //     title: 'Peter Piper',
// //     artist: 'Donna Washington',
// //     artwork: 'https://xw4e-q7et-qbbl.n7.xano.io/vault/Uw4WIAUU/0jyQ_iUWLMDdQNEHebF9LDRjYqI/z5y7LQ../WashingtonDonna_Peter_Piper_96x96.jpg',
// //   },
// // ];

// export function Player() {
//   const podcastsCount = podcasts.length;
//   const [trackIndex, setTrackIndex] = useState(0);
//   const [trackTitle, setTrackTitle] = useState();
//   const [trackArtist, setTrackArtist] = useState();
//   const [trackArtwork, setTrackArtwork] = useState();

//   const playBackState = usePlaybackState();
//   const progress = useProgress();

//   const setupPlayer = async () => {
//     try {
//       await TrackPlayer.setupPlayer();
//       await TrackPlayer.updateOptions({
//         capabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//           Capability.SeekTo,
//         ],
//       });
//       await TrackPlayer.load(podcasts[0]);
//       await getTrackData();
//       await TrackPlayer.play();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
//     if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
//       const track = await TrackPlayer.getTrack(event.nextTrack);
//       const { title, artwork, artist } = track;
//       console.log(event.nextTrack);
//       setTrackIndex(event.nextTrack);
//       setTrackTitle(title);
//       setTrackArtist(artist);
//       setTrackArtwork(artwork);
//     }
//   });

//   const getTrackData = async () => {
//     let trackIndex = await TrackPlayer.getCurrentTrack();
//     let trackObject = await TrackPlayer.getTrack(trackIndex);
//     console.log(trackIndex);
//     setTrackIndex(trackIndex);
//     setTrackTitle(trackObject.title);
//     setTrackArtist(trackObject.artist);
//     setTrackArtwork(trackObject.artwork);
//   };

//   const togglePlayBack = async playBackState => {
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack != null) {
//       if ((playBackState == State.Paused) | (playBackState == State.Ready)) {
//         await TrackPlayer.play();
//       } else {
//         await TrackPlayer.pause();
//       }
//     }
//   };

//   const nextTrack = async () => {
//     if (trackIndex < podcastsCount - 1) {
//       await TrackPlayer.skipToNext();
//       getTrackData();
//     } else {
//       await TrackPlayer.skip(podcasts[0].id);
//       getTrackData();
//     }
//   };

//   const previousTrack = async () => {
//     if (trackIndex > 0) {
//       await TrackPlayer.skipToPrevious();
//       getTrackData();
//     }
//   };

//   useEffect(() => {
//     setupPlayer();
//   }, []);

//   if (Platform.OS === 'web')
//     return (
//       <View>
//         <Text>You can not use this component on the Web</Text>
//       </View>
//     );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.mainContainer}>
//         <View style={styles.mainWrapper}>
//           <Image source={{ uri: trackArtwork }} style={styles.imageWrapper} />
//         </View>
//         <View style={styles.songText}>
//           <Text
//             style={[styles.songContent, styles.songTitle]}
//             numberOfLines={3}
//           >
//             {trackTitle}
//           </Text>
//           <Text
//             style={[styles.songContent, styles.songArtist]}
//             numberOfLines={2}
//           >
//             {trackArtist}
//           </Text>
//         </View>
//         <View>
//           <Slider
//             style={styles.progressBar}
//             value={progress.position}
//             minimumValue={0}
//             maximumValue={progress.duration}
//             thumbTintColor="#FFD369"
//             minimumTrackTintColor="#FFD369"
//             maximumTrackTintColor="#fff"
//             onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
//           />
//           <View style={styles.progressLevelDuration}>
//             <Text style={styles.progressLabelText}>
//               {new Date(progress.position * 1000)
//                 .toLocaleTimeString()
//                 .substring(3)}
//             </Text>
//             <Text style={styles.progressLabelText}>
//               {new Date((progress.duration - progress.position) * 1000)
//                 .toLocaleTimeString()
//                 .substring(3)}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.musicControlsContainer}>
//           <TouchableOpacity onPress={previousTrack}>
//             <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => togglePlayBack(playBackState?.state)}
//           >
//             <Ionicons
//               name={
//                 playBackState?.state === State.Playing
//                   ? 'ios-pause-circle'
//                   : playBackState?.state === State.Buffering
//                   ? 'ios-hourglass'
//                   : 'ios-play-circle'
//               }
//               size={75}
//               color="#FFD369"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={nextTrack}>
//             <Ionicons
//               name="play-skip-forward-outline"
//               size={35}
//               color="#FFD369"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#222831',
//   },
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainWrapper: {
//     width: width,
//     height: width,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageWrapper: {
//     alignSelf: 'center',
//     width: '90%',
//     height: '90%',
//     borderRadius: 15,
//     imageResizeMode: 'cover',
//   },
//   songText: {
//     marginTop: 2,
//     height: 70,
//   },
//   songContent: {
//     textAlign: 'center',
//     color: '#EEEEEE',
//   },
//   songTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   songArtist: {
//     fontSize: 16,
//     fontWeight: '300',
//   },
//   progressBar: {
//     alignSelf: 'stretch',
//     marginTop: 40,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   progressLevelDuration: {
//     width: width,
//     padding: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   progressLabelText: {
//     color: '#FFF',
//   },
//   musicControlsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20,
//     width: '60%',
//   },
// });
