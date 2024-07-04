import React, { useEffect } from "react";

const Tasks = (props) => {
  useEffect(() => {

    // have to edit tasks so they display properly
  }

    

  , [props.setSelected]);
  
  const clicked = t => {
    props.setSelected(t);
  };

  

  return (
    <main className="collection">
      {props.tasks.length !== 0 ? props.tasks.map((t) => (
        <a
          key={t.id}
          className={t.isSelected ? "collection-item a-badge amber lighten-5" : "collection-item a-badge" }
          onClick={() => clicked(t)}
        >
          {props.isNew && <span className="new badge amber">New!</span>}
          {t.location} : {t.name}
        </a>
      )): <a className= "collection-item a-badge">No tasks meet selected criteria</a>}
    </main>
  );
};

export default Tasks;
