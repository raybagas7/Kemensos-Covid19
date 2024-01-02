import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
        <Link href={"/"}>
          <div className="w-fit cursor-pointer rounded-full border-[1px] border-border bg-white p-1 px-3 hover:bg-primary/20">
            <Image
              alt="jds-logo"
              src="/logo/logo_jds.png"
              className="h-7 w-auto"
              width={200}
              height={100}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavigation;
