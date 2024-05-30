import React from "react";

const Tasks = (props) => {
  // useEffect to populate tasks.  new tag to check for new tasks for amber badge
  const tasks = [];
  // placeholder
  let isNew = false;

  
  const r1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Neque laoreet suspendisse interdum consectetur libero id faucibus.';
  const r2 = 'A little more ' + r1;
  const r3 = 'Even the most ' + r1;

  const requests = [
    { id: 1, location: "Lubbock", task: "task", description: r1 },
    { id: 2, location: "San Antonio", task: "task", description: r2 },
    { id: 3, location: "Houston", task: "task", description: r3 },
  ];
  
  const clicked = r => {
    props.setSelected(r);
  };

  return (
    <main className="collection">
      {requests.map((r) => (
        <a
          key={r.id}
          href="#!"
          className="collection-item"
          onClick={() => clicked(r)}
        >
          {props.isNew && <span className="new badge amber">1</span>}
          {r.location} : {r.task}
        </a>
      ))}
    </main>
  );
};

export default Tasks;
