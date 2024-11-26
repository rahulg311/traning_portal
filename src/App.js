import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "../src/styles/style.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Helmet } from "react-helmet"; // Import Helmet
import "bootstrap/dist/css/bootstrap.min.css";

import NotFound from "./NotFound";
import LoginUser from "./Pages/LoginUser";
import axios from "axios";

// import Feedback from "./Pages/Feedback";

import VideoPlayer from "./Pages/VideoPlayer";
import Dashboard from "./Pages/Dashboard";
import LanguageSelectionCard from "./Pages/LanguageSelectionCard";

import TraningDetails from "./Pages/TraningDetails";

function App() {
  return (
    <Routes>
      <Route path="/Videos" element={<VideoPlayer />} />
   
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/TraningDetails" element={<TraningDetails />} />
      
      
      <Route path="/" element={<LanguageSelectionCard />} />

      {/* JiwaDetails */}

      <Route path="*" element={<LoginUser />} />

   
 
    </Routes>
  );
}

export default App;
