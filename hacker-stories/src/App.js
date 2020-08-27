import React from "react";
// import logo from './logo.svg';
// import './App.css';

const title = "React";

function App() {
  return (
    <div className="App">
      {/* <h1>hello world</h1> */}
      <h1>hello {title}</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
