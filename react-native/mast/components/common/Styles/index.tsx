import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  // Common
  title: {
    fontSize: 64,
    textAlign: "center",
    marginTop: 30
  },
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center"
  },
  card: {
    padding: 0
  },
  error: {
    fontSize: 64,
    textAlign: "center",
    padding: 32,
    color: "red"
  },
  loading: {
    fontSize: 64,
    textAlign: "center",
    padding: 32,
    color: "grey"
  },
  // HomePage
  search_bar: {
    marginTop: 16
  },
  home_icon: {
    height: 0.1 * height,
    resizeMode: "contain",
    alignItems: "center",
    padding: 8
  },
  home_icon_label: {
    fontSize: 0.038 * width,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    color: "white"
  },
  home_button: {
    flex: 1,
    alignItems: "center",
    padding: 8
  },
  home_grid: {
    paddingLeft: 32,
    paddingRight: 32,
    height: 0.5 * height
  },
  // SearchPage
  search_container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 65,
    paddingTop: 22,
    paddingBottom: 22,
    marginLeft: 16,
    marginRight: 16
  },
  // AllergenPage
  citation: {
    flex: 1,
    color: "grey",
    padding: 32
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
  video: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "white"
  },
  buy_button: {
    alignItems: "flex-end",
    resizeMode: "contain",
    height: 32,
    paddingBottom: 8
  }
});

export default styles;
