"use client";

import React, { useState, useEffect, useRef } from "react";
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
  // const WS_URL = "ws://localhost:8080/maintenance-wombat";
  const WS_URL = "ws://localhost:8080/wombat-users";
  const [loginState, setLoginState] = useState(true);
  const [maintainerState, setMaintainerState] = useState(true);
  const [initialState, setInitialState] = useState(true);
  const [socketState, setSocketState] = useState();
  const [messageState, setMessageState] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [userState, setUserState] = useState();

  const socketRef = useRef(null);
  const loginButtonRef = useRef(null);
  const hasSocketBeenSetUp = useRef(false);
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    document.title = "Maintenance Wombat";

    if (userState) {
      if (userState.userType === 'MAINTENANCE') {
        setMaintainerState(true);
      } else {
        setMaintainerState(false);
      }
      setLoginState(false); // Set login state to false after successful login
    }
    
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        loginButtonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userState]);

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

  const setupWebsocket = () => {
    if (!hasSocketBeenSetUp.current) {
      const socket = new WebSocket(WS_URL);
      socketRef.current = socket;
      hasSocketBeenSetUp.current = true;

      socket.addEventListener("open", () => {
        console.log("connection established");
      });

      socket.addEventListener("message", (event) => {
        setMessageState((prevMessages) => [...prevMessages, event.data]);
        let response = JSON.parse(event.data);

        console.log(response);
        
        if (response.message !== '200') {
          if (response.message === '204') {
            let message = `User ` + usernameState + ` does not exist!`;
            M.toast({ html: message });
          } else {
            M.toast({ html: "password incorrect!" });
          }
        } else {
          setUserState(response.user);
        }
      });

      socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
      });

      return () => {
        socket.close();
      };
    }
  };

  const login = () => {
    setupWebsocket();
    if (usernameState !== "" && passwordState !== "") {
      let user = {
        name: usernameState,
        password: passwordState,
      };
      if (socketRef.current) {
        if (socketRef.current.readyState === WebSocket.OPEN) {
          if (socketRef) usernameRef.current = usernameState;
          passwordRef.current = passwordState;

          // console.log(JSON.stringify(user));
          socketRef.current.send(JSON.stringify(user));
        } else {
          socketRef.current.addEventListener("open", () => {
            socketRef.current.send(JSON.stringify(user));
          });
        }
      }
    } else {
      M.toast({ html: "Enter some creds before trying to login!" });
    }
  };

  const logout = () => {
    setLoginState(true);
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
            socket={socketRef.current}
            messageState={messageState}
            locationState={locationState}
            categoryState={categoryState}
          />
        ) : (
          <Requester socket={socketRef.current} />
        ))}
      {loginState && (
        <a
          ref={loginButtonRef}
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
