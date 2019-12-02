'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AllergenPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allergen: this.props.navigation.getParam("allergen", {name: "unknown"})
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>{this.state.allergen.name}</Text>
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
