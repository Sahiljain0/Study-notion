import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/common/NavBar";
function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter">
     <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
