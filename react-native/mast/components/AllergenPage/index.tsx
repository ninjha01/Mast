"use strict";

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Video from "react-native-video";
import Media from "../../assets/";
import Firebase from "../utils/Firebase";

export default class AllergenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergen: this.props.navigation.getParam("allergen", { name: "unknown" }),
      firebase: this.props.navigation.getParam("firebase", null),
      loading: true,
      videoSrc: ""
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.populateVideo();
    this.setState({ loading: false });
  }

  populateVideo() {
    const allergen = this.state.allergen;
    console.log(allergen.pdb_id);
    if (allergen.pdb_id) {
      this.state.firebase.getURLByName(allergen.pdb_id + ".mp4").then(url => {
        this.setState({
          videoSrc: { uri: url }
        });
      });
    } else {
      this.setState({ videoSrc: Media.common.not_found });
    }
  }

  renderRow(label, value) {
    return (
      <Card>
        <Text>Hello World</Text>
      </Card>
    );
  }

  render() {
    if (this.state.error) {
      return <Text style={styles.title}>this.state.error</Text>;
    }
    if (this.state.loading) {
      return <Text style={styles.title}>Loading</Text>;
    }

    const allergen = this.state.allergen;
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.allergen.name}</Text>
        <Video
          source={this.state.videoSrc}
          ref={ref => {
            this.player = ref;
          }}
          onBuffer={() => console.log("buffering")}
          onError={() => console.log("error")}
          style={styles.video}
          repeat={true}
          muted={true}
        />
        <ScrollView style={styles.list}>
          {list.map(l => (
            <Card>
              <Text style={styles.label}>{l.label}</Text>
              <Text style={styles.value}>{l.value}</Text>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 16
  },
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 16,
    marginRight: 16
  },
  list: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16
  },
  label: {
    fontWeight: "bold"
  },
  value: {
    fontWeight: "300"
  },
  card: {
    padding: 0
  },
  video: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "white"
  }
});
