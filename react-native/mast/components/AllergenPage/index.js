'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AllergenPage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Allergen Page</Text>
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
