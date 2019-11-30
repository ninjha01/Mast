// Firebase ----
import * as firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: ***REMOVED***,
  authDomain: "mast-b0959.firebaseapp.com",
  databaseURL: "https://mast-b0959.firebaseio.com",
  projectId: "mast-b0959",
  storageBucket: "mast-b0959.appspot.com",
  messagingSenderId: "318389768634",
  appId: "1:318389768634:web:dd148c8466f591dd0a4d83"
};
firebase.initializeApp(config);
var database = firebase.database()
var ref = database.ref()

// Firebase ----
'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

export default class SearchPage extends Component {

  constructor() {
    super();
    this.state = {
      allergens: [],
      loading: false,
    }
  }

  
  componentDidMount() {
    this.setState({ loading: true });
    const aref = ref.child('allergens').orderByChild('category').equalTo('Venom');
    aref.on('value', snapshot => {
      console.log("snapshot", snapshot)
      const allergens = Object.values(snapshot.val());
      console.log("snapshot val", snapshot)

      this.setState({
	allergens: allergens,
	loading: false,
      });
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Text style={styles.title}>this.state.error</Text>
      )
    }
    if (this.state.loading) {
      return (
        <Text style={styles.title}>Loading</Text>
      )
    }
    var allergens = this.state.allergens
    console.log("rendered allergens", allergens)
    if (allergens.length > 0) {
      var allergenList = <FlatList
			   style={styles.container}
			   data={allergens}
			   keyExtractor={(item) => item.name}
			   renderItem={({ item }) => <Text styles={styles.item}>{item.name}</Text>}
      />
    }
    else {
      allergenList = <Text style={styles.item}> No Allergens Found </Text>
    }
    return (
      <View style={{ flex: 1 }} >
        <Text style={styles.title}>Search Page </Text>
        {allergenList}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 65,
  },
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 65,
    paddingTop: 22,
    paddingBottom: 22,
    borderColor: 'red',
    borderWidth: 1,
  },
  item: {
    padding: 20,
    fontSize: 18,
    height: 100,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});



