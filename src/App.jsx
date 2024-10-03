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
      </Routes>
    </div>
  );
}

export default App;
