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
  const TASK_WS_URL = "ws://localhost:8080/maintenance-wombat";
  const WS_URL = "ws://localhost:8080/wombat-users";
  const [loginState, setLoginState] = useState(true);
  const [maintainerState, setMaintainerState] = useState(true);
  const [initialState, setInitialState] = useState(true);
  const [socketState, setSocketState] = useState();
  const [userMessageState, setUserMessageState] = useState([]);
  const [taskMessageState, setTaskMessageState] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [userState, setUserState] = useState();

  const userSocketRef = useRef(null);
  const taskSocketRef = useRef(null);
  const loginButtonRef = useRef(null);
  const hasSocketBeenSetUp = useRef(false);
  const hasTaskSocketBeenSetUp = useRef(false);
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

  const updateUsernameText = (event) => {
    setUsernameState(event.target.value);
  };

  const updatePasswordText = (event) => {
    setPasswordState(event.target.value);
  };

  const setupUsersocket = () => {
    if (!hasSocketBeenSetUp.current) {
      const socket = new WebSocket(WS_URL);
      userSocketRef.current = socket;
      hasSocketBeenSetUp.current = true;

      socket.addEventListener("open", () => {
        console.log("user connection established");
      });

      socket.addEventListener("message", (event) => {
        setUserMessageState((prevMessages) => [...prevMessages, event.data]);
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
    setupUsersocket();
    if (usernameState !== "" && passwordState !== "") {
      let user = {
        name: usernameState,
        password: passwordState,
      };
      if (userSocketRef.current) {
        if (userSocketRef.current.readyState === WebSocket.OPEN) {
          if (userSocketRef) usernameRef.current = usernameState;
          passwordRef.current = passwordState;

          // console.log(JSON.stringify(user));
          userSocketRef.current.send(JSON.stringify(user));
        } else {
          userSocketRef.current.addEventListener("open", () => {
            document.body.style.cursor = 'wait';
            userSocketRef.current.send(JSON.stringify(user));
          });
        }
      }
    } else {
      M.toast({ html: "Enter some creds before trying to login!" });
    }
  };

  const setupTaskSocket =() => {
    if (!hasTaskSocketBeenSetUp.current) {
      console.log("setupTaskSocket run if evalutes false")
      const socket = new WebSocket(TASK_WS_URL);
      taskSocketRef.current = socket;
      hasTaskSocketBeenSetUp.current = true;

      socket.addEventListener("open", () => {
        console.log("task connection established");
      });

      socket.addEventListener("message", (event) => {
        setTaskMessageState((prevMessages) => [...prevMessages, event.data]);
        let response = JSON.parse(event.data);
        console.log(response);

        // TODO add logic to process response

      });

      
      socket.addEventListener("error", (event) => {
        console.error("Task Socket Error:", event);
      });

      return () => {
        socket.close();
      };

    }
  }

  const getTasks = () => {
    setupTaskSocket();
    /*
      TODO - update socket on the backend to send a bad request response if an error is thrown
    */
    let request = {
      task: {
        name: "request",
        prio: "low",
        location: "san antonio",
        kind: "other"
      },
      type: "getall"
    }

    if (taskSocketRef.current) {
      if (taskSocketRef.current.readyState === WebSocket.OPEN) {
        // console.log("request:\n" + JSON.stringify(request));
        taskSocketRef.current.send(JSON.stringify(request));
      
      } else {
        taskSocketRef.current.addEventListener("open", () => {
          taskSocketRef.current.send(JSON.stringify(request));
        });
      }

    }

  };

  const logout = () => {
    setLoginState(true);
    setUserState(null);
    setUsernameState('');
    setPasswordState('');
  };

  return (
    <main className={styles.main}>
      <Header
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
            socket={taskSocketRef.current}
            messageState={taskMessageState}
            locationState={locationState}
            categoryState={categoryState}
            getTasks={getTasks}
          />
        ) : (
          <Requester socket={taskSocketRef.current} />
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
