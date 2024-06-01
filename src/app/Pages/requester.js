import React, { useState, useEffect } from "react";

import Locations from "../Components/requester/locations";
import Type from "../Components/requester/type";
import Priority from "../Components/requester/priority";
import Description from "../Components/requester/rDescription";

const Requester = (props) => {
  const [descriptionState, setDescriptionState] = useState("");
  const [typeState, setTypeState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [prioState, setPrioState] = useState("");
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (!(prioState === "" || typeState === "" || locationState === "" || descriptionState.length === 0)) {
      setButtonState(true);
    }
  }, [prioState, locationState, typeState, descriptionState]);

  const updateDescriptionText = (event) => {
    setDescriptionState(event.target.value);
  };

  const clearAll = () => {
    setTypeState("");
    setLocationState("");
    setPrioState("");
    setDescriptionState("");
  }

  const submit = () => {
    if (descriptionState.length > 50) {
      M.toast({ html: "Description is too long" });
      return;
    }

    const request = {
      task: {
        name: descriptionState,
        prio: prioState,
        kind: typeState,
        location: locationState,
      },
      type: "delete",
    };

    props.socket.send(JSON.stringify(request));
    clearAll();
  };

  return (
    <React.Fragment>
      <main className="container">
        <article className="row">
          <Locations setLocationState={setLocationState} />
          <Type setTypeState={setTypeState} />
          <Priority setPrioState={setPrioState} />
        </article>
        <article className="row">
          <Description
            updateDescriptionText={updateDescriptionText}
            description={descriptionState}
            setDescriptionState={setDescriptionState}
          />
        </article>
        <article className="row">
          {buttonState ? (
            <button
              className="btn waves-effect waves-light blue hoverable"
              type="submit"
              name="action"
              onClick={() => submit()}
            >
              Submit
            </button>
          ) : (
            <button
              className="btn waves-effect waves-light blue hoverable"
              type="submit"
              name="action"
              onClick={() => submit()}
              disabled
            >
              Submit
            </button>
          )}
        </article>
      </main>
    </React.Fragment>
  );
};

export default Requester;
