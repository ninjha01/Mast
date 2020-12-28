import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./components/HomePage";
import { Firebase } from "./components/firebase";

interface AppProps { }
interface AppState { }

class App extends React.Component<AppProps, AppState> {
  firebase: Firebase;
  constructor(props: AppProps) {
    super(props);
    this.firebase = new Firebase();
    this.state = {};
  }

  componentDidMount = async () => { };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            component={() => <HomePage firebase={this.firebase} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
