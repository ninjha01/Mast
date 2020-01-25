import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { ThemeProvider } from "react-native-elements";

import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import AllergenPage from "./components/AllergenPage";

const MainStackNavigator = createStackNavigator({
  Home: HomePage,
  Search: SearchPage,
  Allergen: AllergenPage
});

const DrawerNavigator = createDrawerNavigator({
  MainStack: {
    screen: MainStackNavigator
  }
});

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
