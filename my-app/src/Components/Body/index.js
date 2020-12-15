import React, { useCallback, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Player from "../Player";
import "./styles.css";

function Body({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = useCallback(
    () => setShowSidebar((value) => !value),
    []
  );

  return (
    <div id="app">
      <aside style={showSidebar ? { left: 0 } : { left: "-230px" }}>
        <Sidebar sidebarState={toggleSidebar} />
      </aside>
      <main
        style={
          showSidebar
            ? { left: "230px", position: "fixed" }
            : { left: 0, position: "inherit" }
        }
      >
        <Header
          style={showSidebar ? { left: "230px" } : { left: 0 }}
          sidebarState={toggleSidebar}
        />
        {children}
      </main>
      <footer>
        <Player />
      </footer>
    </div>
  );
}

export default Body;
