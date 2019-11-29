import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SearchPage from "./SearchPage.js";
import AllergenPage from "./AllergenPage.js";

const AppNavigator = createStackNavigator({
  Search: SearchPage,
  Allergen: AllergenPage
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
