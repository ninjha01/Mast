"use strict";

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Video from "react-native-video";

export default class AllergenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergen: this.props.navigation.getParam("allergen", { name: "unknown" })
    };
  }

  renderRow(label, value) {
    return (
      <Card>
        <Text>Hello World</Text>
      </Card>
    );
  }

  render() {
    const allergen = this.state.allergen;
    var videoURL;

    // TODO: actually call Firebase class method
    if (typeof allergen.pdb_id != "undefined") {
      videoURL = "movies/" + allergen.pdb_id + ".mp4";
    } else {
      videoURL = "movies/not_found.mp4";
    }
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
        <Video
          source={{ uri: { videoURL } }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
        <Text style={styles.title}>
          {this.state.allergen.name} |#| {this.state.allergen.category}
        </Text>
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
    fontSize: 18,
    textAlign: "center",
    marginTop: 65
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 16,
    marginRight: 16
  },
  list: {
    marginTop: 65,
    marginBottom: 65,
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
  }
});
