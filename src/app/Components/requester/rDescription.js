import React, { useEffect } from "react";
import M from "materialize-css";

const Description = (props) => {

  useEffect(() => {
    M.CharacterCounter.init(document.querySelectorAll('.materialize-textarea'));
  }, []);

  const clear = () => {
    props.setDescriptionState("");
  }

  return (
    <React.Fragment>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea" data-length="50" onChange={props.updateDescriptionText} value={props.description}></textarea>
              <label for="textarea1">Description</label>
            </div>
          </div>
        </form>
        <a className="right clear-button" onClick={clear}>Clear</a>
    </React.Fragment>
  );
};

export default Description;
