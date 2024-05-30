import React from "react";

const Description = (props) => {
  return (
    <React.Fragment>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea" onChange={props.updateDescriptionText} value={props.description}></textarea>
              <label for="textarea1">Description</label>
            </div>
          </div>
        </form>
        <a className="right clear-button" onClick={props.clear}>Clear</a>
    </React.Fragment>
  );
};

export default Description;
