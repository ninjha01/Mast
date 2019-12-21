"use strict";

import React, { Component } from "react";
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Text,
  StyleSheet
} from "react-native";
import { SearchBar } from "react-native-elements";
import Media from "../../assets/";
import Firebase from "../utils/Firebase";
import NavigationStyles from "../Navigation";

export default class HomePage extends Component {
  static navigationOptions = ({ navigation }) => {
    return NavigationStyles.home_page;
  };

  constructor(props) {
    super(props);
    this.state = {
      // Category is defined when searching for a category, Query is used for arbitrary strings,
      query: "",
      category: "",
      query_type: "",
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

  submitQuery(query?: string, query_type?: string) {
    var nextNavigationOptions = NavigationStyles.home_page;
    if (this.state.query_type == "category") {
      nextNavigationOptions = NavigationStyles[this.state.category];
    } else {
      nextNavigationOptions["title"] = "Search: " + this.state.query;
    }
    console.log(this.state.query, nextNavigationOptions);
    this.props.navigation.navigate("Search", {
      query: this.state.query,
      query_type: this.state.query_type,
      tag: this.state.category,
      firebase: this.state.firebase,
      navigationOptions: nextNavigationOptions
    });
  }

  buttonPressed(label: string, tag?: string) {
    this.setState(
      { query: label, category: tag, query_type: "category" },
      () => {
        this.submitQuery();
      }
    );
  }

  renderButton(label: string, tag: string, src: string) {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => this.buttonPressed(label, tag)}
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
      <ImageBackground
        source={Media.home_page.background}
        style={{ width: "100%", height: "100%" }}
      >
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
          <View style={styles.container}>
            <Image style={styles.icon} source={Media.common.logo} />
          </View>
          <FlatList
            data={buttons}
            renderItem={({ item }) =>
              this.renderButton(item.label, item.tag, item.imageSrc)
            }
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
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
    fontSize: 0.038 * width,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    color: "white"
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
    tag: "animal",
    imageSrc: Media.home_page.icons.animal
  },
  {
    label: "Cockroach",
    tag: "cockroach",
    imageSrc: Media.home_page.icons.cockroach
  },
  {
    label: "Food",
    tag: "food",
    imageSrc: Media.home_page.icons.food
  },
  {
    label: "House Dust Mite",
    tag: "house_dust_mite",
    imageSrc: Media.home_page.icons.house_dust_mite
  },
  {
    label: "Mold",
    tag: "mold",
    imageSrc: Media.home_page.icons.mold
  },
  {
    label: "Latex",
    tag: "latex",
    imageSrc: Media.home_page.icons.latex
  },
  {
    label: "Venom",
    tag: "venom",
    imageSrc: Media.home_page.icons.venom
  },
  {
    label: "Pollen",
    tag: "pollen",
    imageSrc: Media.home_page.icons.pollen
  },
  {
    label: "Other",
    tag: "other",
    imageSrc: Media.home_page.icons.other
  }
];
