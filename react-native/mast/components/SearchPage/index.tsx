"use strict";

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ListItem } from "react-native-elements";
import Firebase from "../utils/Firebase";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergens: [],
      query: this.props.navigation.getParam("query", null),
      query_type: this.props.navigation.getParam("query_type", null),
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
      return <Text style={styles.title}>this.state.error</Text>;
    }
    if (this.state.loading) {
      return <Text style={styles.title}>Loading</Text>;
    }
    var allergens = this.state.allergens;
    if (allergens.length > 0) {
      var allergenList = allergens.map((a, i) => {
        return (
          <Card style={styles.card}>
            <ListItem
              key={i}
              title={a.name}
              onPress={() =>
                this.props.navigation.navigate("Allergen", { allergen: a })
              }
            />
          </Card>
        );
      });
    } else {
      allergenList = <Text style={styles.item}> No Allergens Found </Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Search Page </Text>
        <ScrollView>{allergenList}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 65
  },
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 65,
    paddingTop: 22,
    paddingBottom: 22,
    marginLeft: 16,
    marginRight: 16
  },
  card: {
    padding: 0
  }
});
