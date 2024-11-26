import { Menu, X, User, CheckCircle } from 'lucide-react';
import cpmlogo from '../Images/cpmlogo.png';
import SideBaar from './SideBaar';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [languageLabels, setLanguageLabels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { languagesId, UidData } = location?.state || {};
  const baseUrl = "https://api1.parinaam.in/api/Training/";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const localData = JSON.parse(sessionStorage.getItem("userdata"));
    
    // Save user data to session storage
    if (languagesId && UidData) {
      sessionStorage.setItem(
        "userdata",
        JSON.stringify({ languageid: languagesId, UID: UidData })
      );
    }

    // Load data on mount
    fetchUserDetails(languagesId || localData?.languageid, UidData || localData?.UID);
    fetchLanguageLabels(languagesId || localData?.languageid);
  }, []);

  const fetchLanguageLabels = async (languageId) => {
    try {
      const response = await axios.post(baseUrl + "ViewTranslation", { LanguageId: languageId });
      if (response?.data?.ViewTranslation) {
        setLanguageLabels(response.data.ViewTranslation);
      } else {
        console.error("Error fetching language labels");
      }
    } catch (error) {
      console.error("Error in ViewTranslationList API call:", error.message);
    }
  };

  const fetchUserDetails = async (languageId, uid) => {
    if (!languageId || !uid) {
      console.error("Error: Missing required fields (languageId or UID).");
      return;
    }

    try {
      const response = await axios.post(baseUrl + "GetTrainingUIDDetails", { languageid: languageId, UID: uid });
      const userDetails = response?.data?.GetTrainingUIDDetails?.[0];

      if (userDetails?.Message === "Invalid UID format") {
        console.error("Error: Invalid UID format.");
        return;
      }

      const parsedData = JSON.parse(userDetails?.Data || "{}");
      if (Object.keys(parsedData).length > 0) {
        setUserData(parsedData);
      } else {
        console.error("Error: Received empty user data.");
      }
    } catch (error) {
      console.error("Error while fetching user details:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg_col shadow-sm py-2 px-4 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-dark-100 text-white">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="logo_height">
              <img src={cpmlogo} alt="Logo" />
            </div>
          </div>
          <div className="flex items-center gap-4">
          <button className="p-2 rounded-full  text-white">
              {/* <span className="sr-only text-white">User profile</span> */}
               <span className="sr-onl bg-whit text-white ms-3"> 👤  {languageLabels.Welcometo} {userData.empname}</span>
            </button>
            <div className="dropdown d-none d-md-block d-lg-block">
              <button
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                type="button"
                id="userProfileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <User className="me-2" size={18} />
                <span>{languageLabels?.UserProfile || "Profile"}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userProfileDropdown">
                <li>
                  <a className="dropdown-item">
                    <strong>{languageLabels?.Name || "Name"}:</strong> {userData.empname}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    <strong>{languageLabels?.ProjectCode || "Project Code"}:</strong> {userData.project}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-14">
        {/* Sidebar */}
        <SideBaar isOpen={sidebarOpen} languageLabels={languageLabels} />

        {/* Main Content */}
        <main className={`flex-1 p-6 ${sidebarOpen ? 'ml-20' : 'ml-20'} transition-all duration-300 mt-4 mt-md-0 mt-lg-0`}>
          <h2 className="text-2xl font-bold mb-6"> {languageLabels.Welcometoyourlibrary}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData?.trainings?.map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
              <div
      onClick={() => navigate("/TraningDetails", { state: { CourseData: course } })}
      className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
    >
      {/* Play Icon */}
      {/* <span className="absolute text-4xl text-white bg-black bg-opacity-50 rounded-full p-2 z-10">▶️</span> */}
      
      {/* Thumbnail */}
      <img 
      
        src={course.VideoThumbnail} 
        alt={`${course.trainingname} Thumbnail`} 
        className="w-full h-full object-cover rounded-lg object-fit-inherit"
      />
    </div>
                <h5 className="font-bold mb-1">{course.trainingname}</h5>
                <p className="text-gray-600 text-sm mb-2">{course.subtitle}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{languageLabels.Trainer}: {userData.empname}</span>
                  <span>{ course.videoseenduration} /{ course.videoduration} {languageLabels.Mins}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        course?.videoduration && course?.videoseenduration
                          ? (course.videoseenduration / course.videoduration) * 100
                          : 0 
                      }%`,
                    }}
                  ></div>
                </div>
                <div>
                {course.completionstatus == "Yes" ? (
                                <div className="d-grid mt-4">
                                  <button className="btn btn-success video-disabled btn-lg d-flex align-items-center justify-content-center">
                                    <CheckCircle
                                      className="text-white me-2"
                                      // size={18}
                                    />
                                    <span>{languageLabels?.Completed} !</span>
                                  </button>
                                </div>
                              ) : "" }
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
