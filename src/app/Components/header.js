import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";

const Header = (props) => {
  const dropdownRef = useRef(null);

  let headerCss = props.maintainerState ? 'nav-wrapper amber' : 'nav-wrapper blue';
  let textCss = props.maintainerState ? 'orange-text text-darken-2' :  'blue-text text-darken-2' ;

  useEffect(() => {

    const dropdownElems = M.Dropdown.init(dropdownRef.current, {});
    return () => {
      dropdownElems.destroy();
    };

  }, []);

  const switchUser = () => {
    props.switchUser();
  };
  return (
    <React.Fragment>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a href="#!" className={textCss}>
            one
          </a>
        </li>
        <li>
          <a href="#!">two</a>
        </li>
        <li className="divider"></li>
        <li>
          <a href="#!">three</a>
        </li>
      </ul>
      <nav>
        <div className={headerCss}>
        {props.maintainerState ? 
          <a className="brand-logo">
            Maintenance Requests
          </a> : <a className='brand-logo'>Submit Maintenance Request</a>}
          <ul className="right hide-on-med-and-down">
            <li>
              <a onClick={switchUser}>Switch user</a>
            </li>
            {props.maintainerState && <React.Fragment><li>
              <a className="dropdown-trigger" href="#!" data-target="dropdown1">
                View By Request Category
              </a>
            </li>
            <li>
              <a
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown1"
                ref={dropdownRef}
              >
               View By Location
              </a>
            </li></React.Fragment>}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
