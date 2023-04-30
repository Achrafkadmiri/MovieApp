import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Button } from 'react-native'
import { WebView } from 'react-native-webview'

import { getImageFromApi } from '../API/TMDBApi'
import { getDetailsFilm } from '../API/TMDBApi'
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
//import MapViewDirections from 'react-native-maps-directions';
//


const ProfileScreen = ({ navigation, route }) => {
  const [content, setContent] = useState("d")
  const [region, setRegion] = useState({latitude: 33.584655,
    longitude: -7.643913,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,})
  const [video, setVideo] = useState("")
  


  const { films } = route.params;
  const userLocation =async ()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
       longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      
    });
  }
  const fetchData = async () => {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/' + films.id + '?api_key=4ba0ac4ac5568ac5bb86d17146ef60f1&language=fr'
    );

    setContent(data);
    // console.log(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/' + films.id + '/videos?api_key=4ba0ac4ac5568ac5bb86d17146ef60f1&language=fr'
    );

    setVideo(data.results[0]?.key);
  };
  function cl() {
    return (
      <Text style={styles.date_text}>
        Genre : {content.genres.map((con) =>
          <Text>{con.name}</Text>
        )}

      </Text>
    )
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    userLocation();
   
  }, []);
  const destination = {latitude: 33.59618136225557, longitude: -7.668137614273118};
  return (

    <ScrollView style={styles.main_container}>
      <Image
        style={styles.image}
        source={{ uri: getImageFromApi(content.poster_path) }}
      />

      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{content.title}</Text>
        </View>
        <View style={styles.header_container}>
          <Ionicons style={styles.icon_container} name="heart-outline" size={40}
            color="red" />
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text} numberOfLines={8}>{content.overview}</Text>
        </View>
        <View style={styles.infos_container}>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {content.release_date}</Text>
            <Text style={styles.date_text}>Note :{content.vote_average}</Text>
            <Text style={styles.date_text}>Nombre des votes :{content.vote_count}</Text>
            <Text style={styles.date_text}>revenue :{content.revenue} $</Text>
            <Text style={styles.date_text}>temps :{content.runtime} minutes</Text>

            <Button title='Bande Annonce' onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video}`)} />
            <View style={styles.description_container}>
            <MapView style={styles.map} region={region}>
 
               <Marker title='vous' coordinate={region} image={require('../assets/images2.png')}></Marker>
               <Marker title='cinema megarama' coordinate={destination} image={require('../assets/cinema.png')}></Marker>
               </MapView>
               </View>
          </View>
        </View>
      </View>
      <View>
      
      </View>
    </ScrollView>

  )

};
const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column'
  },
  image: {
    resizeMode: "stretch",
    width: 400,
    height: 300,
    margin: 5,
    flex: 0,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 0,
    margin: 22

  },
  header_container: {
    flex: 0,
    flexDirection: 'column'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 0,
    flexWrap: 'wrap',
    paddingRight: 5
  },

  description_container: {
    flex: 0,
    marginTop: 19,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 0
  },
  infos_container: {
    fontWeight: 'bold',
    flex: 0,
    marginTop: 19,
  },
  icon_container: {
    padding: 10,
    textAlign: 'center'
  },
  date_text: {
    textAlign: 'left',
    fontSize: 14
  },
  map: {
    width: 400,
    height: 300,
  },
  Annonce_text: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,

  }
})
export default ProfileScreen;