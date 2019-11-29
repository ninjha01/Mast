import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import AllergenPage from "./components/AllergenPage";

const AppNavigator = createStackNavigator({
  Home: HomePage,
  Search: SearchPage,
  Allergen: AllergenPage
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
