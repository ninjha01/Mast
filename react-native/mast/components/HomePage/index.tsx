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
  StyleSheet,
  Button
} from "react-native";
import Images from "../../assets/";
import SearchableDropdown from "react-native-searchable-dropdown";
import Firebase from "../../components/utils/Firebase";

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
        <SearchableDropdown
          onTextChange={text => this.updateSearch(text)}
          onItemSelect={item => this.foundAllergen(item)}
          containerStyle={{ padding: 5 }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#FAF7F6"
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1
          }}
          itemTextStyle={{
            color: "#222"
          }}
          items={items}
          placeholder="Search for Allergens"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.title}>{this.state.title}</Text>
        <View style={styles.container}>
          <Image style={styles.icon} source={Images.common.logo} />
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

const items = [
  {
    allergenicity: "3 out of 13 (23%) A. siro RAST-positive patient...",
    allergenicity_ref: "10474032",
    biochemical_name: "Fatty acid-binding protein",
    category: "House Dust Mite",
    mw: "15 kDa",
    name: "Aca s 13",
    order: "Astigmata",
    route: "Airway",
    source: "Animalia Arthropoda",
    species: "Acarus siro"
  }
];

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
    imageSrc: Images.home_page.icons.animal
  },
  {
    label: "Cockroach",
    imageSrc: Images.home_page.icons.cockroach
  },
  {
    label: "Food",
    imageSrc: Images.home_page.icons.food
  },
  {
    label: "House Dust Mite",
    imageSrc: Images.home_page.icons.house_dust_mite
  },
  {
    label: "Mold",
    imageSrc: Images.home_page.icons.mold
  },
  {
    label: "Latex",
    imageSrc: Images.home_page.icons.latex
  },
  {
    label: "Venom",
    imageSrc: Images.home_page.icons.venom
  },
  {
    label: "Pollen",
    imageSrc: Images.home_page.icons.pollen
  },
  {
    label: "Other",
    imageSrc: Images.home_page.icons.other
  }
];
