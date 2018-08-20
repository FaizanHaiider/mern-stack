import React from "react";
import PropType from "prop-types";
import { Segment, Menu, Dropdown } from "semantic-ui-react";

function style() {
  return {
    segment: {
      "border-radius": "0px"
    },
    navbar: {
      padding: "0em 5em 0em 5em"
    }
  };
}

const NavBar = () => {
  const styles = style();
  const authenticated = false;

  const logIn = <Menu.Item name="Log In" position="right" />;
  const logOut = <Menu.Item name="Log Out" position="right" />;

  return (
    <Segment inverted style={styles.segment}>
      <Menu inverted pointing style={styles.navbar}>
        <Menu.Item name="MERN CRUD app" />
        <Menu.Item name="Home" />
        <Dropdown item simple text="Products">
          <Dropdown.Menu>{/* {todo} */}</Dropdown.Menu>
        </Dropdown>
        {authenticated ? logOut : logIn}
      </Menu>
    </Segment>
  );
};

export default NavBar;
