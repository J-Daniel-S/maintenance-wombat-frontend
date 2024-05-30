import React, { useState } from "react";

import Locations from "../Components/requester/locations";
import Type from "../Components/requester/type";
import Priority from "../Components/requester/priority";
import Description from "../Components/requester/rDescription";

const Requester = (props) => {
    const [descriptionState, setDescriptionState] = useState('');

    const updateDescriptionText = event => {
        setDescriptionState(event.target.value);
    }

  return (
    <React.Fragment>
      <main className="container">
        <article className="row">
          <Locations />
          <Type />
          <Priority />
        </article>
        <article className="row">
          <Description updateDescriptionText={updateDescriptionText} description={descriptionState} />
        </article>
        <article className="row">
          <button
            className="btn waves-effect waves-light blue hoverable"
            type="submit"
            name="action"
          >
            Submit
          </button>
        </article>
      </main>
    </React.Fragment>
  );
};

export default Requester;
