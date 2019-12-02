// Firebase ----
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const config = {
  apiKey: ***REMOVED***,
  authDomain: "mast-b0959.firebaseapp.com",
  databaseURL: "https://mast-b0959.firebaseio.com",
  projectId: "mast-b0959",
  storageBucket: "mast-b0959.appspot.com",
  messagingSenderId: "318389768634",
  appId: "1:318389768634:web:dd148c8466f591dd0a4d83",
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // unlimited cache size
};

firebase.initializeApp(config);
// Firebase ----
'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem, } from 'react-native-elements'

export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allergens: [],
      query: this.props.navigation.getParam("query", ""),
      query_type: this.props.navigation.getParam("query_type", ""),
      loading: false,
    }
  }


  componentDidMount() {
    this.setState({ loading: true });
    this.updateAllergens(this.state.query, this.state.query_type);
  }

  updateAllergens(query, query_type) {
    firebase.firestore().collection("allergens")
      .get()
      .then((querySnapshot) => {
        const allergens = querySnapshot.docs.map(doc => ({ ...doc.data() }))
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
      var allergenList =
        allergens.map((a, i) => {
          return (
            <Card style={styles.card}>
              <ListItem
                key={i}
                title={a.name}
                onPress={() => this.props.navigation.navigate("Allergen", { allergen: a })}
              />
            </Card>
          );
        })
    }
    else {
      allergenList = <Text style={styles.item}> No Allergens Found </Text>
    }
    return (
      <View style={{ flex: 1 }} >
        <Text style={styles.title}>Search Page </Text>
        <ScrollView>
          {allergenList}
        </ScrollView>
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
    marginLeft: 16,
    marginRight: 16,
  },
  card: {
    padding: 0,
  }
});



