import React, { useEffect } from "react";

const Tasks = (props) => {
    // useEffect to populate tasks.  new tag to check for new tasks for amber badge
    const tasks = [];
    let isNew = false;

    return(
        <main className="collection">
            <a href="#!" className="collection-item">{isNew && <span className="new badge amber">1</span>}Alan</a>
            <a href="#!" className="collection-item"><span className="new badge amber">1</span>Also Alan</a>
            <a href="#!" className="collection-item"><span className="new badge amber">1</span>Moar Alan</a>
            <a href="#!" className="collection-item"><span className="new badge amber">1</span>Alan!</a>
            <a href="#!" className="collection-item"><span className="new badge amber">1</span>Alaaaaan</a>
            <a href="#!" className="collection-item"><span className="new badge amber">1</span>Haalan</a>

        </main>
    );
};

export default Tasks;