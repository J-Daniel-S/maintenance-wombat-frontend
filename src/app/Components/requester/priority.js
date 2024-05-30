import React from "react";

const Priority = (props) => {
  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Priority</span>
            <form action="#" className="priority-card">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                  />
                  <span>High</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Medium</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    className="with-gap"
                    class="with-gap"
                    name="group1"
                    type="radio"
                  />
                  <span>Low</span>
                </label>
              </p>
            </form>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Priority;
