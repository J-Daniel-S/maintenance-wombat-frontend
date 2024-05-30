import React from "react";

const Type = (props) => {
  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Request Type</span>
            <form action="#" className="type-card">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                  />
                  <span>Electrical</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Plumbing</span>
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
                  <span>IT</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Structural</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Cleanup</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Other</span>
                </label>
              </p>
            </form>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Type;
