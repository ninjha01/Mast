"use strict";

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import Video from "react-native-video";
import Media from "../../assets/";
import Firebase from "../common/Firebase";
import NavigationStyles from "../common/Navigation";
import styles from "../common/Styles";

export default class AllergenPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const tag = navigation.getParam("tag", "other");
    return NavigationStyles[tag];
  };

  constructor(props) {
    super(props);
    this.state = {
      tag: this.props.navigation.getParam("tag", "other"),
      allergen: this.props.navigation.getParam("allergen", { name: "unknown" }),
      firebase: this.props.navigation.getParam("firebase", null),
      loading: true,
      videoSrc: ""
    };
  }

  componentDidMount() {
    this.populateVideo();
    this.populateButton();
  }

  populateButton() {
    if (this.state.allergen.sold) {
      // TODO: more sophisticated search
      const baseUrl =
        "https://inbio.com/index.php?route=product/search&search=";
      const url = encodeURI(baseUrl + this.state.allergen.name);
      this.setState({
        buy_btn: (
          <TouchableOpacity
            style={styles.buy_button}
            activeOpacity={0.5}
            onPress={() => {
              Linking.openURL(url);
            }}
          >
            <Image
              source={Media.allergen_page.buy_icon}
              style={styles.buy_button}
            />
          </TouchableOpacity>
        )
      });
    }
  }

  populateVideo() {
    this.setState({ loading: true });
    const allergen = this.state.allergen;
    if (allergen.pdb_id) {
      this.state.firebase
        .getURLByName(allergen.pdb_id + ".mp4")
        .then(url => {
          this.setState({
            videoSrc: { uri: url },
            loading: false
          });
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    } else {
      this.setState({
        videoSrc: Media.common.not_found,
        loading: false
      });
    }
  }

  render() {
    //TODO: gracefully handle errors
    if (this.state.error) {
      return <Text style={styles.error}>{this.state.error}</Text>;
    }
    if (this.state.loading) {
      return <Text style={styles.title}>Loading</Text>;
    }

    const allergen = this.state.allergen;
    console.log("allergen", allergen);
    const list = [
      {
        label: "Name",
        value: allergen.name
      },
      {
        label: "Source",
        value: allergen.source
      },
      {
        label: "Order",
        value: allergen.order
      },
      {
        label: "Species",
        value: allergen.species
      },
      {
        label: "Biochemical Name",
        value: allergen.biochemical_name
      },
      {
        label: "MW (SDS-PAGE)",
        value: allergen.mw
      },
      {
        label: "Allergenicity",
        value: allergen.allergenicity
      },
      {
        label: "Allergenicity Ref",
        value: allergen.allergenicity_ref
      },
      {
        label: "Route",
        value: allergen.route
      }
    ];

    // TODO: Add poster image to display while loading
    return (
      <View style={styles.container}>
        <ScrollView style={styles.list}>
          <Video
            source={this.state.videoSrc}
            ref={ref => {
              this.player = ref;
            }}
            onBuffer={() => console.log("Buffering")}
            onError={() => this.setState({ error: true })}
            resizeMode="contain"
            style={styles.video}
            repeat={true}
            muted={true}
            resizeMode={"contain"}
          />
          {this.state.buy_btn}
          {list.map((l, i) => (
            <Card key={i}>
              <Text style={styles.label}>{l.label}</Text>
              <Text style={styles.value}>{l.value}</Text>
            </Card>
          ))}
          <Text style={styles.citation}>
            Data sourced from the IUIS Allergen Nomenclature Database
          </Text>
        </ScrollView>
      </View>
    );
  }
}
