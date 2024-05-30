import React from "react";

const Request = (props) => {
  return (
    <React.Fragment>
      <div className="collapsible-header">
        {props.isNew && <span className="new badge amber">1</span>}Alan
      </div>
      <div className="collapsible-body"><p>body</p></div>
    </React.Fragment>
  );
};

export default Request;
