'use strict';
import React, {Component} from 'react';
import {Text, View, StyleSheet, NavigatorIOS} from 'react-native';

export default class SearchPage extends Component {
  render() {
    return (
      <View style={styles.description}>
        <Text>AllergenGuru</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
