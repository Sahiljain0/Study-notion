import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "../src/Redux/store/store.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
    
);
