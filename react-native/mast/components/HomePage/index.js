'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class HomePage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Home Page</Text>
        <Button
          title="Search"
          onPress={() => this.props.navigation.navigate("Search")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 65,
  },
});



