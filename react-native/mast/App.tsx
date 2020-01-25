import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Icon, ThemeProvider } from "react-native-elements";

import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import AllergenPage from "./components/AllergenPage";

import ConferencePage from "./components/ConferencePage";

// Navigation for Drawer and non drawer pages
const AppStack = createStackNavigator({
  Home: HomePage,
  Search: SearchPage,
  Allergen: AllergenPage
});

// Navigation for pages in Drawer
const Drawer = createDrawerNavigator({
  AppStack: {
    screen: AppStack,
    navigationOptions: {
      title: "Home"
    }
  },
  Conference: {
    screen: ConferencePage,
    navigationOptions: {
      title: "Conference"
    }
  }
});

const AppContainer = createAppContainer(Drawer);

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
