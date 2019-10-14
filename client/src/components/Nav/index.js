import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItems = ({ show }) => {
  return (
    <div
      className="expand-items-container"
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      <a href="/" className="expand-items">
        provider
      </a>
      <a href="/" className="expand-items">
        contact
      </a>
      <a href="/" className="expand-items">
        symptoms
      </a>
      <a href="/" className="expand-items">
        insurance
      </a>
    </div>
  );
};

const NavExpand = ({ onClick }) => {
  return (
    <div className="expand-container" onClick={onClick}>
      <FontAwesomeIcon icon="plus" />
    </div>
  );
};

class Nav extends React.Component {
  state = {
    navItemsVisible: false
  };
  toggleMenu = () =>
    this.setState(state => ({
      dropDownVisible: !state.dropDownVisible
    }));

  render() {
    return (
      <div className="Nav">
        <NavExpand onClick={this.toggleMenu} />
        <NavItems show={this.state.dropDownVisible} />
      </div>
    );
  }
}

export default Nav;
