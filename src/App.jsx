import React from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/common/NavBar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import { useSelector } from "react-redux";
import Settings from "./components/core/Dashboard/Settings/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
function App() {
  const { user } = useSelector((state) => state.profile)
  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Toaster />
      
      <audio id="notificationSound" src="/sound.mp3" preload="auto" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />


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
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id" // update password ke sath ek
          element={
            //toke bhi hogi isiliye id bhi add ki h //
            <OpenRoute>
              <UpdatePassword />
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

        {/* Dashboard side routes added */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
        
          {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }
        {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse/>} />
          <Route path="dashboard/my-courses" element={<MyCourses/>} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }
      
      
      </Route>
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>



        {/* error path route  */}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
