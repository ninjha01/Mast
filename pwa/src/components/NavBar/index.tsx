import React, { useState } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import { slide as Menu } from "react-burger-menu";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <Menu
        isOpen={open}
        styles={style}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      >
        <ul
          style={{
            listStyleType: "none",
            fontSize: "30px",
          }}
        >
          <li>
            <Link onClick={onClick} id="home" className="menu-item" to="/">
              Allergen Guru
            </Link>
          </li>
        </ul>
      </Menu>
      <h4> Allergen Guru </h4>
      <p style={{ position: "absolute", right: "16px", top: "20px" }}> v1.9 </p>
    </div>
  );
};
const style = {
  bmBurgerButton: {
    position: "relative",
    width: "26px",
    height: "20px",
    left: "16px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "white",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    overflowY: "hidden",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
