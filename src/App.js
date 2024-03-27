import React from "react";
import './App.css';
import { action, comedy, originals, romance } from "./urls";
import NavBar from "./Components/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url= {originals} title='Netflix Originals' />
      <RowPost url={action} title= 'Action' isSmall />
      <RowPost url={comedy} title= 'Comedy' isSmall />
      <RowPost url={romance} title= 'Romance' isSmall />
    </div>
  );
}

export default App;
