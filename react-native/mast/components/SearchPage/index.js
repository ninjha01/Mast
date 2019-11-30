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

  getAllergens() {
    this.setState({ loading: true });

    fetch('https://mast-b0959.firebaseio.com/allergens.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          allergens: responseJson,
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          error: error
        })
        console.error(error);
      });
  }

  componentDidMount() {
    this.getAllergens();
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
    if (allergens.length > 0) {
      var allergenList = <FlatList
        style={styles.container}
        data={allergens}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => <Text styles={styles.item}>{item.Name}</Text>}
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



