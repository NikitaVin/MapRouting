import React from "react";
import "./scss/app.scss";
import { TableRoute } from "./components/Table/TableRoute";
import { Map } from "./components/Map/Map";

function App() {
  return (
    <div className="App">
      <TableRoute />
      <Map />
    </div>
  );
}

export default App;
