import React from "react";
import { Firebase } from "../firebase";
import { NavBar } from "../NavBar";

interface HomePageProps {
  firebase: Firebase;
}

interface HomePageState {
  loading: boolean;
}

export const HomePage = (props: HomePageProps) => {
  return (
    <div id="outer-container">
      <NavBar />
      <div id="page-wrap">
        <div
          className="container"
          style={{
            overflow: "auto",
            overscrollBehavior: "contain",
            height: "100%",
          }}
        >
          <h1> Hello World </h1>
        </div>
      </div>
    </div>
  );
}
