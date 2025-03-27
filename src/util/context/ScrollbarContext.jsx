import PerfectScrollbar from "perfect-scrollbar";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ScrollbarContext = createContext(null);

export const useScrollbar = () => useContext(ScrollbarContext);

export const ScrollbarProvaider = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const ps = new PerfectScrollbar(containerRef.current, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 10,
      });
      return () => {
        ps.destroy();
      };
    }
  }, []);

  return (
    <ScrollbarContext.Provider value={containerRef}>
      <div ref={containerRef} style={{ height: "100vh", overflow: "hidden" }}>
        {children}
      </div>
    </ScrollbarContext.Provider>
  );
};

export default ScrollbarProvaider;
