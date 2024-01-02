import React, { useEffect, useRef } from "react";
import Image from "next/image";

const TopNavigation = ({ toggleSideNav, navHeight, setNavHeight }) => {
  const topNavbarRef = useRef(null);

  useEffect(() => {
    const calculateNavbarHeight = () => {
      if (topNavbarRef.current) {
        const height = topNavbarRef.current.clientHeight;
        setNavHeight(height);
      }
    };

    calculateNavbarHeight();

    const handleOnResize = () => {
      calculateNavbarHeight();
    };

    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
  }, [setNavHeight]);

  return (
    <nav className="2 fixed top-0 z-[100] w-full border-[1px] bg-background/60 px-3 py-3 backdrop-blur md:px-28">
      <div>
        <Image
          alt="jds-logo"
          src="/logo/logo_jds.png"
          className="h-8 w-auto"
          width={200}
          height={100}
        />
      </div>
    </nav>
  );
};

export default TopNavigation;
