import React, { useState } from "react";
import TopNavigation from "./TopNavigation";

const MainNavigation = () => {
  const [sideNav, setSideNav] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  //navHeight digunakan untuk offset react-scroll

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  const clickOutsidePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <TopNavigation />
    </>
  );
};

export default MainNavigation;
