"use strict";

import React, { Component } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem } from "react-native-elements";
import styles from "../common/Styles";
import NavigationStyles from "../common/Navigation";
import Colors from "../common/Colors";
import Firebase from "../common/Firebase";

export default class SearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return navigation.getParam("navigationOptions", null);
  };

  constructor(props) {
    super(props);
    this.state = {
      allergens: [],
      query: this.props.navigation.getParam("query", null),
      query_type: this.props.navigation.getParam("query_type", null),
      tag: this.props.navigation.getParam("tag", null),
      loading: false,
      firebase: this.props.navigation.getParam("firebase", null)
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.updateAllergens(this.state.query, this.state.query_type);
  }

  updateAllergens(query, query_type) {
    this.state.firebase
      .getAllergenCollection(query, query_type)
      .get()
      .then(col => {
        const allergens = col.docs.map(doc => ({ ...doc.data() }));
        this.setState({
          allergens: allergens,
          loading: false
        });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <View styles={styles.container}>
          <Text style={styles.error}>
            Something went wrong. Check your internet connection.
          </Text>
        </View>
      );
    }
    if (this.state.loading) {
      return (
        <View styles={styles.container}>
          <Text style={styles.loading}>Loading...</Text>
          <ActivityIndicator
            size="large"
            color={Colors.allergen_guru.main_color}
          />
        </View>
      );
    }
    var allergens = this.state.allergens;
    if (allergens.length > 0) {
      var allergenList = allergens.map((a, i) => {
        return (
          <Card key={i} style={styles.search_card}>
            <ListItem
              key={i}
              title={a.name}
              onPress={() =>
                this.props.navigation.navigate("Allergen", {
                  allergen: a,
                  tag: this.state.tag,
                  firebase: this.state.firebase
                })
              }
            />
          </Card>
        );
      });
    } else {
      allergenList = (
        <Text style={styles.search_title}> No Allergens Found </Text>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>{allergenList}</ScrollView>
      </View>
    );
  }
}
