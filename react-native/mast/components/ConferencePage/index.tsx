"use strict";

import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../common/Styles";
import NavigationStyles from "../common/Navigation";

export default class ConferencePage extends Component {
  static navigationOptions = ({ navigation }) => {
    return NavigationStyles.conference_page(navigation);
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
      </View>
    );
  }
}
