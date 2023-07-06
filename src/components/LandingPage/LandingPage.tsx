import React, { useState, useEffect } from "react";
import MobileLandingPage from "../MobileLandingPage/MobileLandingPage";
import DesktopLandingPage from "../DesktopLandingPage/DesktopLandingPage";

const LandingPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  console.log("SMD LOSER landing");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>{isMobile ? <MobileLandingPage /> : <DesktopLandingPage />}</div>;
};

export default LandingPage;
