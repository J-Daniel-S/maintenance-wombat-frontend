"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Maintainer from "./Pages/maintainer";
import Requester from "./Pages/requester";
import Header from "./Components/header";
import "../../node_modules/materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";

const Home = () => {
  // set false for standard users, true for maintenance personnel
  const [maintainerState, setMaintainerState] = useState(true);

  useEffect(() => {
    document.title = "Maintenance Wombat";
  }, []);

  const switchUser = () => {
    setMaintainerState(!maintainerState);
  };

  return (
    <main className={styles.main}>
      <Header switchUser={switchUser} maintainerState={maintainerState} />
      {maintainerState ? <Maintainer /> : <Requester />}
      <a className="waves-effect waves-teal btn-flat logout-button">Logout</a>
    </main>
  );
};

export default Home;
