import { useState } from "react";
import "./App.css";
import { Login } from "./components/login";
import React from "react";
import { TabsMain } from "./components/tabs";
import { RouterOptions } from "./routes";

function App() {
  return (
    <>
      <RouterOptions />
      {/* <Login /> */}
    </>
  );
}

export default App;
