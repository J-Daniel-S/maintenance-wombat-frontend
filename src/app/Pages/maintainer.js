"use client";

import React, { useState, useEffect } from "react";
import Tasks from "../Components/tasks";
import Description from "../Components/maintainer/mDescription";

const Maintainer = (props) => {
  const [textState, setTextState] = useState("");
  const [taskState, setTask] = useState("");
  const [selectedState, setSelectedState] = useState(false);
  const [tasksState, setTasksState] = useState([]);
  // will use when real websocket is used
  const [prevTasksState, setPrevState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);

  window.onload = function () {
    const r0 =
      "ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Neque laoreet suspendisse interdum consectetur libero id faucibus.";
    const r1 = "Lubbock " + r0;
    const r2 = "San Antonio " + r0;
    const r3 = "Houston " + r0;

    const requests = [
      {
        id: 1,
        location: "Lubbock",
        task: "task",
        description: r1,
        priority: "low",
        type: "plumbing",
        isSelected: false,
      },
      {
        id: 2,
        location: "San Antonio",
        task: "task",
        description: r2,
        priority: "low",
        type: "other",
        isSelected: false,
      },
      {
        id: 3,
        location: "Sugarland",
        task: "task",
        description: r3,
        priority: "medium",
        type: "electrical",
        isSelected: false,
      },
    ];

    setTasksState(requests);
  };

  useEffect(() => {
    setFilteredState(tasksState);

    if (props.locationState !== '') {
      setFilteredState(tasksState.filter((task) => task.location === props.locationState));
    }

    if (props.categoryState !== '') {
      setFilteredState(filteredState.filter((task) => task.category === props.categoryState));
    }

  }, [props.messageState, tasksState, props.locationState, props.categoryState]);

  const handleChange = (e) => {
    if (socket.readyState === WebSocket.OPEN) {
      setTextState(e.target.value);
      socket.send(textState);
    } else {
      setTimeout(handleChange(), 3);
    }
  };

  const taskSelected = (t) => {
    setSelectedState(true);
    setTask(t);
    tasksState.forEach((task) => {
      if (task.id === t.id) {
        task.isSelected = true;
      }
    });
  };

  const clearSelection = () => {
    setSelectedState(false);
    setTask("");
    const temp = tasksState.map((task) => ({...task}));
    temp.forEach((element) => {
      element.isSelected = false;
    });
    setTasksState(temp);
  };

  const submit = () => {
    let task = {
      task: {
        name: taskState.task,
        prio: taskState.priority,
        kind: taskState.type,
        location: taskState.location,
      },
      type: "addorupdate",
    };
    const toSend = JSON.stringify(task);
    removeTask();
    props.socket.send(toSend);
  };

  const removeTask = () => {
    return new Promise((resolve, reject) => { // remove if unnecessary once backend is connected, currently unnecessary
      const temp = tasksState.map((task) => ({...task}));
      const index = temp.findIndex((task) => task.id == taskState.id);
      let removed;
      if (index !== -1) {
        removed = temp.splice(index, 1);
        clearSelection();
        setTasksState(temp);
      }
      resolve();
    });
  };

  return (
    <React.Fragment>
      <section className="container">
        <section>
          <Tasks setSelected={taskSelected} tasks={filteredState} />
        </section>
        {selectedState && (
          <div className="fade-in">
            <Description description={taskState.description} />
            <a className="right clear-button" onClick={clearSelection}>
              Clear Selection
            </a>
            <br></br>
          </div>
        )}
        {selectedState ? (
          <a onClick={() => submit()} className="btn-large amber">
            Accept Task
          </a>
        ) : (
          <a className="btn-large disabled">Accept Task</a>
        )}
      </section>
    </React.Fragment>
  );
};

export default Maintainer;
