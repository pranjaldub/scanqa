import "./App.css";
import HomeContainer from "./containers/homeContainer/homeContainer";
import NavbarContainer from "./containers/navbarContainer/navbarContainer";

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
