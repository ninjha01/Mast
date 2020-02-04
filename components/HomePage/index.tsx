"use strict";

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import styles from "../common/Styles";
import NavigationStyles from "../common/Navigation";
import Firebase from "../common/Firebase";

export default class HomePage extends Component {
  static navigationOptions = ({ navigation }) => {
    return NavigationStyles.home_page(navigation);
  };

  constructor(props) {
    super(props);
    this.state = {
      firebase: new Firebase()
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
      </View>
    );
  }
}
