"use client";

import React, { useState, useEffect } from "react";
import Tasks from "../Components/tasks";
import Description from "../Components/maintainer/mDescription";

const Maintainer = (props) => {
  const [textState, setTextState] = useState("");
  const [taskState, setTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedState, setSelectedState] = useState(false);
  const [prevTasksState, setPrevState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  
  useEffect(() => {
    document.body.style.cursor = 'default';
    setFilteredState(props.tasksState);

    if (props.locationState !== '') {
      setFilteredState(props.tasksState.filter((task) => task.location === props.locationState));
    }

    let category = props.categoryState

    if (props.categoryState !== '') {
      setFilteredState(filteredState.filter((task) => task.kind === category.toUpperCase()));
    }
    
    if (props.initialRequestState === false) {
      props.getTasks();
      props.setInitialRequestState(true);
    }


  }, [props.messageState, props.tasksState, props.locationState, props.categoryState]);

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
    props.tasksState.forEach((task) => {
      if (task.id === t.id) {
        task.isSelected = true;
      }
    });
    setSelectedTaskId(t.id);
  };

  const clearSelection = () => {
    setSelectedState(false);
    setTask(null);
    const temp = props.tasksState.map((task) => ({...task}));
    temp.forEach((t) => {
      t.isSelected = false;
    });
    // props.setTasksState(temp);
    setSelectedTaskId(null);
  };

  const submit = () => {
    let task = {
      task: {
        id: taskState.id,
        name: taskState.name,
        prio: taskState.priority,
        kind: taskState.kind,
        location: taskState.location,
      },
      type: "delete",
      maintenanceUser: props.userState.name,
    };
    const toSend = JSON.stringify(task);
    console.log(toSend);
    // to replace with "receive and update" when connected to backend
    // removeTask();
    props.socket.send(toSend);
  };

  const removeTask = () => {
    // TODO: REPLACE WITH A CALL TO THE BACKEND TO DELETE THE TASK
    return new Promise((resolve, reject) => {
      const temp = props.tasksState.map((task) => ({...task}));
      const index = temp.findIndex((task) => task.id == taskState.id);
      let removed;
      if (index !== -1) {
        removed = temp.splice(index, 1);
        clearSelection();
        props.setTasksState(temp);
      }
      resolve();
    });
  };

  return (
    <React.Fragment>
      <section className="container">
        <section>
          <Tasks setSelected={taskSelected} tasks={filteredState} task={taskState} selectedTaskId={selectedTaskId} />
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
