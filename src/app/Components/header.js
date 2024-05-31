import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";

const Header = (props) => {
  const locationDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const [locationDropdown, setLocationDropdown] = useState(null);
  const [categoryDropdown, setCategoryDropdown] = useState(null);

  let headerCss = props.maintainerState
    ? "nav-wrapper amber"
    : "nav-wrapper blue";
  let textCss = props.maintainerState
    ? "orange-text text-darken-2"
    : "blue-text text-darken-2";

  useEffect(() => {
    initializeDropdowns();
    return () => {
      destroyDropdowns();
    };
  }, [props.maintainerState]);

  const initializeDropdowns = () => {
    destroyDropdowns();

    const locationElems = M.Dropdown.init(locationDropdownRef.current, {});
    setLocationDropdown(locationElems);
    const categoryElems = M.Dropdown.init(categoryDropdownRef.current, {});
    setCategoryDropdown(categoryElems);
  };

  const destroyDropdowns = () => {
    if (locationDropdown) {
      locationDropdown.destroy();
      setLocationDropdown(null);
    }
    if (categoryDropdown) {
      categoryDropdown.destroy();
      setCategoryDropdown(null);
    }
  };

  const switchUser = () => {
    props.switchUser();
  };
  //  Need to add functionality that receives all locations from the backend
  const locations = [
    { location: "San Antonio", id: 1 },
    { location: "Fort Worth", id: 2 },
    { location: "Abilene", id: 3 },
    { location: "Lubbock", id: 4 },
    { location: "Amarillo", id: 5 },
    { location: "McAllen", id: 6 },
    { location: "Sugarland", id: 7 },
  ];

  const categories = [
    { category: "Electrical", id: 1 },
    { category: "Plumbing", id: 3 },
    { category: "IT", id: 4 },
    { category: "Structural", id: 5 },
    { category: "Cleanup", id: 6 },
    { category: "Other", id: 7 },
  ];

  const categoryClicked = (c) => {
    props.setCategoryState(c.category);
  };

  const locationClicked = (l) => {
    props.setLocationState(l.location);
  };

  const allLocationsClicked = () => {
    props.setLocationState('');
  };

  const allCategoriesClicked = () => {
    props.setCategoryState('');
  };

  const headerButtonClass = 'dropdown-trigger header-button center-align';

  return (
    <React.Fragment>
      <ul id="location-dropdown" className="dropdown-content">
        <li onClick={() => allLocationsClicked()}>
          <a className="header-button">All</a>
        </li>
        {locations.map((l) => (
          <li key={l.id} onClick={() => locationClicked(l)}>
            <a className="header-button">{l.location}</a>
          </li>
        ))}
      </ul>
      <ul id="category-dropdown" className="dropdown-content">
        <li onClick={() => allCategoriesClicked()}>
          <a className="header-button">All</a>
        </li>
        {categories.map((c) => (
          <li key={c.id} onClick={() => categoryClicked(c)}>
            <a className="header-button">{c.category}</a>
          </li>
        ))}
      </ul>
      <nav>
        <div className={headerCss}>
          {props.maintainerState ? (
            <a className="brand-logo">Maintenance Requests</a>
          ) : (
            <a className="brand-logo">Submit Maintenance Request</a>
          )}
          <ul className="right hide-on-med-and-down">
            <li>
              <a onClick={switchUser}>Switch user</a>
            </li>
            {props.maintainerState && (
              <React.Fragment>
                <li>
                  <a
                    className={headerButtonClass}
                    data-target="category-dropdown"
                    ref={categoryDropdownRef}
                  >
                    {props.categoryState === "" ? 'View By Request Category' : ' - ' +  props.categoryState + ' - '}
                  </a>
                </li>
                <li>
                  <a
                    className={headerButtonClass}
                    data-target="location-dropdown"
                    ref={locationDropdownRef}
                  >
                    {props.locationState === "" ? 'View By Location' : ' - ' + props.locationState + ' - '}
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
