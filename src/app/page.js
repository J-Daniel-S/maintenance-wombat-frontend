"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Tasks from "./Components/tasks";
import '../../node_modules/materialize-css/dist/css/materialize.css';

const Home = () => {
  const WS_URL = "wss://ws.postman-echo.com/raw";
  const [messageState, setMessageState] = useState([]);
  const [textState, setTextState] = useState('');
  const [initialState, setInitialState] = useState(true);
  // const { sendMessage, lastMessage, readyState} = useWebSocket(WS_URL, {
  //   share: false,
  //   shouldReconnect: () => true,
  // });

  const socket = new WebSocket(WS_URL);

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

  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  // useEffect(() => {

  // }, [messageState]);

  useEffect(() => {
    console.log(`new message: ${messageState}`);
  }, [messageState]);

  const handleChange = e => {
    if (socket.readyState === WebSocket.OPEN) {
      setTextState(e.target.value);
      socket.send(textState);
    } else {
      setTimeout(handleChange(), 3);
    }
  };

  return (
    <main className={styles.main}>
      <section>
        {messageState}
        <br></br>
        <section>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  value={textState}
                  onChange={handleChange}
                ></textarea>
                <label className="active" for="textarea1">Message to send:</label>
              </div>
            </div>
          </form>
          <Tasks />
        </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
