"use strict";

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import Colors from "../Colors";
import styles from "../Styles";

const MenuBarButton = navigation => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.menu_left}
      onPress={() => navigation.openDrawer()}
    >
      <Icon name="menu" color="white" />
    </TouchableOpacity>
  );
};

const createMenuBarNavStyle = (navigation, title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: Colors.home_page.main_color
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white",
    headerLeft: MenuBarButton(navigation)
  };
};

const navigationStyles = {
  home_page: navigation => createMenuBarNavStyle(navigation, "Home"),
};

export default navigationStyles;
