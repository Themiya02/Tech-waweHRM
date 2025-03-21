import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;