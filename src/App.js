import logo from "./logo.svg";
import "./App.css";
import HomeContainer from "./containers/homeContainer/homeContainer";
import NavbarContainer from "./containers/navbarContainer/navbarContainer";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <>
      <div className="App" style={{ flexGrow: 2 }}>
        <NavbarContainer />
        <HomeContainer />
      </div>
    </>
  );
}

export default App;
