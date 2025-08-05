// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Afficher bouton si scroll > 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-5 z-50 p-2 rounded-full bg-purple-500 text-white shadow-md hover:bg-purple-700 transition duration-300"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={16} />
      </button>
    )
  );
};

export default ScrollToTopButton;
