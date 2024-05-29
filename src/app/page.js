"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Maintainer from './Pages/maintainer';
import Requester from './Pages/requester';
import Tasks from "./Components/tasks";
import Header from "./Components/header"
import "../../node_modules/materialize-css/dist/css/materialize.css";
import 'materialize-css/dist/js/materialize.js';

const Home = () => {
  const [maintainerState, setMaintainerState] = useState(true);

  useEffect(() => {
    document.title = "Maintenance Wombat";
  }, []);

  const switchUser = () => {
    setMaintainerState(!maintainerState);
  }

  return (
    <main className={styles.main}>
      <Header switchUser={switchUser} maintainerState={maintainerState} />
      {maintainerState ? <Maintainer  /> : <Requester />}
    </main>
  );
};

export default Home;
