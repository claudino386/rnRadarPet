import React, { Component } from 'react'
import { Text, View, Image, Button, Linking } from 'react-native'

import { getMissedPet } from '../../services/FetchPet';

import styles from './styles';

export default class index extends Component {
  state = {
    pet: null
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const pet = await getMissedPet(navigation.getParam('petId', 'NO-ID'));
    this.setState({ pet: pet });
  }

  makeCall(phone) {
    Linking.openURL(`tel:${phone}`);
  }

  render() {
    const { pet } = this.state;

    return (
        pet && (
          <View style={styles.container}>
            <Image
              source={{uri: pet.photo}}
              resizeMode={'contain'}
              style={styles.photo}/>
            <Text style={styles.name}>{pet.name} foi perdido</Text>
            <Text style={styles.description}>{pet.description}</Text>
            <Text style={styles.contact}>Dono(a): {pet.contact.name}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Ligar" onPress={e => { this.makeCall(pet.contact.phone) }}/>
            </View>
          </View>
        )
    )
  }
}
