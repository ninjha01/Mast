"use strict";

import React, { Component } from "react";
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet
} from "react-native";
import { SearchBar } from "react-native-elements";
import Media from "../../assets/";
import Firebase from "../utils/Firebase";
import Common from "../utils/Common";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      query_type: "",
      title: "AllergenGuru",
      firebase: new Firebase()
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.foundAllergen = this.foundAllergen.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
  }

  updateSearch(text: string) {
    this.setState({
      query: text,
      query_type: "name"
    });
  }

  submitQuery(query?: string, query_type: string) {
    this.props.navigation.navigate("Search", {
      query: this.state.query,
      query_type: this.state.query_type,
      firebase: this.state.firebase
    });
  }

  buttonPressed(label: string) {
    this.setState({ query: label, query_type: "category" }, () => {
      this.submitQuery();
    });
  }

  renderButton(label: string, src: string) {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => this.buttonPressed(label)}
      >
        <Image source={src} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }

  foundAllergen(a) {
    this.props.navigation.navigate("Allergen", { allergen: a });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 24 }}
          onChangeText={this.updateSearch}
          onSubmitEditing={this.submitQuery}
          onClear={text => this.updateSearch("")}
          placeholder="Search Allergens..."
          value={this.state.query}
        />
        <Text style={styles.title}>{this.state.title}</Text>
        <View style={styles.container}>
          <Image style={styles.icon} source={Media.common.logo} />
        </View>
        <ScrollView contentContainerStyle={styles.grid}>
          <FlatList
            data={buttons}
            renderItem={({ item }) =>
              this.renderButton(item.label, item.imageSrc)
            }
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 30
  },
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center"
  },
  search: {
    marginTop: 16
  },
  icon: {
    height: 0.1 * height,
    resizeMode: "contain",
    alignItems: "center",
    padding: 8
  },
  label: {
    fontSize: 0.03 * width,
    textAlign: "center",
    padding: 8
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 8
  },
  grid: {
    paddingLeft: 32,
    paddingRight: 32,
    height: 0.5 * height
  }
});

const buttons = [
  {
    label: "Animal",
    imageSrc: Media.home_page.icons.animal
  },
  {
    label: "Cockroach",
    imageSrc: Media.home_page.icons.cockroach
  },
  {
    label: "Food",
    imageSrc: Media.home_page.icons.food
  },
  {
    label: "House Dust Mite",
    imageSrc: Media.home_page.icons.house_dust_mite
  },
  {
    label: "Mold",
    imageSrc: Media.home_page.icons.mold
  },
  {
    label: "Latex",
    imageSrc: Media.home_page.icons.latex
  },
  {
    label: "Venom",
    imageSrc: Media.home_page.icons.venom
  },
  {
    label: "Pollen",
    imageSrc: Media.home_page.icons.pollen
  },
  {
    label: "Other",
    imageSrc: Media.home_page.icons.other
  }
];
