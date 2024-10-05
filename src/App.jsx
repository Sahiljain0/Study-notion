import React from "react";
import { Route, Routes } from "react-router";
import { Toaster } from 'react-hot-toast';
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/common/NavBar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import  ForgotPassword  from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter">
      <NavBar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
         <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
         <Route
          path="update-password/:id"   // update password ke sath ek
          element={                      //toke bhi hogi isiliye id bhi add ki h //
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />  
         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
         <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard/my-profile" element={<MyProfile/>} />

      </Routes>
    </div>
  );
}

export default App;
