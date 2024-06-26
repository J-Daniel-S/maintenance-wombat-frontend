"use client";

import React, { useState, useEffect } from "react";
import M from "materialize-css";
import styles from "./page.module.css";
import Maintainer from "./Pages/maintainer";
import Requester from "./Pages/requester";
import Login from "./Pages/login";
import Header from "./Components/header";
import "../../node_modules/materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";

const Home = () => {
  // set false for standard users, true for maintenance personnel
  const WS_URL = "wss://ws.postman-echo.com/raw";
  const [loginState, setLoginState] = useState(true);
  const [maintainerState, setMaintainerState] = useState(true);
  const [initialState, setInitialState] = useState(true);
  const [socketState, setSocketState] = useState();
  const [messageState, setMessageState] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  useEffect(() => {
    document.title = "Maintenance Wombat";

    const socket = new WebSocket(WS_URL);
    setSocketState(socket);
    // Connection opened
    socket.addEventListener("open", () => {
      // console.log("connection established");
      if (initialState) {
        socket.send("Connection established");
        setInitialState(false);
      }
    });

    socket.addEventListener("message", (event) => {
      setMessageState(event.data);
      console.log("Message from server ", event.data);
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
  }, [locationState, categoryState]);

  const switchUser = () => {
    if (!maintainerState) window.location.reload();
    setMaintainerState(!maintainerState);
  };

  const updateUsernameText = (event) => {
    setUsernameState(event.target.value);
  };

  const updatePasswordText = (event) => {
    setPasswordState(event.target.value);
  };

  const login = () => {
    if (usernameState !== "" && passwordState !== "")
      setLoginState(false);
    else 
      M.toast({html: "Enter some creds!"});
  };

  const logout = () => {
    setLoginState(true);
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <Header
        switchUser={switchUser}
        maintainerState={maintainerState}
        setLocationState={setLocationState}
        setCategoryState={setCategoryState}
        locationState={locationState}
        categoryState={categoryState}
        loginState={loginState}
      />
      {loginState && (
        <Login
          updateUsernameText={updateUsernameText}
          updatePasswordText={updatePasswordText}
          usernameState={usernameState}
          passwordState={passwordState}
        />
      )}
      {!loginState &&
        (maintainerState ? (
          <Maintainer
            socket={socketState}
            messageState={messageState}
            locationState={locationState}
            categoryState={categoryState}
          />
        ) : (
          <Requester socket={socketState} />
        ))}
      {loginState && (
        <a
          onClick={() => login()}
          className="waves-effect waves-teal btn-flat logout-button"
        >
          Login
        </a>
      )}
      {!loginState && (
        <a
          onClick={() => logout()}
          className="waves-effect waves-teal btn-flat logout-button"
        >
          Logout
        </a>
      )}
    </main>
  );
};

export default Home;
