// AOSProvider.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration (in milliseconds)
      easing: "ease-in-out-sine", //Starting and ending smooth effect
      once: true, // Only animate once
    });
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
