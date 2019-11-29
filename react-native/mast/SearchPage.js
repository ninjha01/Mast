'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class SearchPage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Search Page </Text>
        <Button
          title="Go to Allergen Page"
          onPress={() => this.props.navigation.navigate("Allergen")}
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



