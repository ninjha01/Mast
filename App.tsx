"use strict";

import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { ThemeProvider } from "react-native-elements";

import HomePage from "./components/HomePage";

// Navigation for Drawer and non drawer pages
const AppStack = createStackNavigator({
  Home: HomePage,
});

// Navigation for pages in Drawer
const Drawer = createDrawerNavigator({
  AppStack: {
    screen: AppStack,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Home: {
    screen: HomePage,
    navigationOptions: {
      drawerLabel: "Home"
    }
  },
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
