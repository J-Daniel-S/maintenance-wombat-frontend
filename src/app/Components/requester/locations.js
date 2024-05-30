import React from "react";

const Locations = (props) => {
  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Locations</span>
            <form action="#" className="location-card">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    required
                  />
                  <span>San Antonio</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Fort Worth</span>
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
                  <span>Abilene</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Lubbock</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Amarillo</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>McAllen</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="group1" type="radio" />
                  <span>Sugarland</span>
                </label>
              </p>
            </form>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Locations;
