"use strict";

import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../common/Styles";
import NavigationStyles from "../common/Navigation";

export default class ConferencePage extends Component {
  static navigationOptions = ({ navigation }) => {
    return NavigationStyles.conference_page(navigation);
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.list}>
          <Text style={{ fontSize: 48, textAlign: "center" }}>
            Innovations in Allergy
          </Text>
          <Text style={{ padding: 16 }}>
            In April 2020, Indoor Biotechnologies will host an exciting new
            conference, “Innovations in Allergy”, in Copenhagen, Denmark at the
            Crowne Plaza, Copenhagen Towers Hotel.
          </Text>
          <Text style={{ padding: 16 }}>
            The purpose of the conference is to provide a platform for companies
            within the allergy field to present their latest research,
            innovations and entrepreneurial ventures. The aim is to bring
            together scientists and thought leaders from industry to stimulate
            debate, discussion, and collaboration about the latest innovations
            in diagnostics and therapeutics; how they will deliver better care;
            and how they will improve the lives of allergic patients.
          </Text>
          <Text style={{ padding: 16 }}>
            This is an exciting time to be working in allergy. Industry has a
            crucial role to play in bringing new ideas and products to market.
            So, whether you are an established company with new technologies on
            the horizon or an enterprising start-up in the field, join us in
            Copenhagen and let’s hear about your latest initiatives.
          </Text>
          <Text style={{ padding: 16 }}>
            Innovations in Allergy 2020 will provide an excellent forum for
            discussion and networking opportunities for delegates from industry,
            academia and regulatory sectors. It will also provide a unique
            opportunity for investors interested in healthcare to see the latest
            innovations for the diagnosis and treatment of common allergic
            diseases.
          </Text>
        </ScrollView>
      </View>
    );
  }
}
