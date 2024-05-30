"use client";

import React, { useState, useEffect } from "react";
import Tasks from "../Components/tasks";
import Description from "../Components/maintainer/mDescription";

const Maintainer = (props) => {
  const WS_URL = "wss://ws.postman-echo.com/raw";
  const [messageState, setMessageState] = useState([]);
  const [textState, setTextState] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [taskDescriptionState, setTaskDescription] = useState('');
  const [selectedState, setSelectedState] = useState(false);
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

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
  });

  useEffect(() => {
    console.log(`new message: ${messageState}`);
  }, [messageState]);

  const handleChange = (e) => {
    if (socket.readyState === WebSocket.OPEN) {
      setTextState(e.target.value);
      socket.send(textState);
    } else {
      setTimeout(handleChange(), 3);
    }
  };

  const switchUser = () => {
    props.switchUser();
  };

  const taskSelected = r => {
    setSelectedState(true);
    console.log(r);
    setTaskDescription(r.description);
  }

  const clearSelection = () => {
    setSelectedState(false);
    setTaskDescription('');
  }

  return (
    <React.Fragment>
      <section className="container">
        {/* {messageState}
        <br></br> */}
        <section>
          {/* <div>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="textarea1"
                    className="materialize-textarea"
                    value={textState}
                    onChange={handleChange}
                  ></textarea>
                  <label className="active" for="textarea1">
                    Message to send:
                  </label>
                </div>
              </div>
            </form>
          </div> */}
          <Tasks setDescription={setTaskDescription} setSelected={taskSelected}/>
        </section>
        {selectedState &&<div className="fade-in">
          <Description description={taskDescriptionState} />
          <a className="right clear-button" onClick={clearSelection}>Clear Selection</a>
        </div>}

      </section>
    </React.Fragment>
  );
};

export default Maintainer;
