import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import CapsulesGrid from "./components/DataGrid";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <CapsulesGrid />
    </>
  );
}

export default App;
