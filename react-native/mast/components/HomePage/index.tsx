'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      query_type: "name",
      title: "Home Page",
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }

  updateSearch(text) {
    this.setState({
      query: text
    })
  }

  submitQuery() {
    this.props.navigation.navigate("Search", {
      query: this.state.query,
      query_type: this.state.query_type,
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.title}>{this.state.title}</Text>
        <View style={styles.search}>
          <SearchBar
            lightTheme
            round
            searchIcon={{ size: 24 }}
            onChangeText={this.updateSearch}
            onSubmitEditing={this.submitQuery}
            onClear={text => this.updateSearch('')}
            placeholder="Search Allergens..."
            value={this.state.query}
          />
        </View>
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
  container: {
    flex: 1,
  },
  search: {
    marginTop: 16,
  }
});



