import React, {Component} from 'react';
import {View} from 'react-native';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import styles from './styles';
import { DOGICON, CATICON, POINTICON } from './assets/images';


// https://github.com/Rocketseat/youtube-react-native-uber/blob/master/src/components/Map/index.js

export default class App extends Component {
  state = {
    region: null,
    me: null,
    pets: null
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async({ coords: {latitude, longitude} }) => {
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          },
          me: {
            coordinate: {
              latitude: latitude,
              longitude: longitude
            },
            image: POINTICON
          },
          pets: [
            {
              id: 1,
              coordinate: {
                latitude: -23.185,
                longitude: -45.935
              },
              image: DOGICON
            }
          ]
        });
      }
    );
  }

  showPetInfo(pet) {
    alert(JSON.stringify(pet));
  }

  render() {
    const { region, me, pets } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}>

          {me && (
            <Marker
              coordinate={me.coordinate}
              image={me.image}/>  
          )}

          {pets && 
            pets.map(pet => (
              <Marker
                key={pet.id}
                coordinate={pet.coordinate}
                image={pet.image}
                onPress={e => { this.showPetInfo(pet) }}/>
            ))
          }
        </MapView>
      </View>
    );
  }
}
