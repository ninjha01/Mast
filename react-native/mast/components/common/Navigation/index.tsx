"use strict";

import React, { Component } from "react";
import { Button, TouchableOpacity } from "react-native";
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
      backgroundColor: Colors.allergen_guru.main_color
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
  conference_page: navigation =>
    createMenuBarNavStyle(navigation, "Conference"),
  animal: {
    title: "Animal",
    headerStyle: {
      backgroundColor: Colors.animal.main_color
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  cockroach: {
    title: "Cockroach",
    headerStyle: {
      backgroundColor: Colors.cockroach.main_color
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  food: {
    title: "Food",
    headerStyle: {
      backgroundColor: Colors.food.main_color
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  house_dust_mite: {
    title: "House Dust Mite",
    headerStyle: {
      backgroundColor: Colors.house_dust_mite.main_color
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  latex: {
    title: "Latex",
    headerStyle: {
      backgroundColor: Colors.latex.main_color
    },
    backgroundColor: "#64a0cd",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  venom: {
    title: "Venom",
    headerStyle: {
      backgroundColor: Colors.venom.main_color
    },
    backgroundColor: "#ffb428",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  pollen: {
    title: "Pollen",
    headerStyle: {
      backgroundColor: Colors.pollen.main_color
    },
    backgroundColor: "#f0b43c",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  mold: {
    title: "Mold",
    headerStyle: {
      backgroundColor: Colors.mold.main_color
    },
    backgroundColor: "#8c962d",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  },
  other: {
    title: "Other",
    headerStyle: {
      backgroundColor: Colors.other.main_color
    },
    backgroundColor: "#5f64cd",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  }
};

export default navigationStyles;
