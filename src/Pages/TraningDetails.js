import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Clock, CheckCircle, User, ArrowLeft } from "lucide-react";

import axios from "axios";
import { Menu, X, BookOpen, Upload } from "lucide-react";
import cpmlogo from "../Images/cpmlogo.png";

import { toast, ToastContainer } from "react-toastify";
import SideBaar from "./SideBaar";
const TraningDetails = () => {
  let baseUrl = "https://api1.parinaam.in/api/Training/";

  const location = useLocation();
  const { languagesId, UidData, CourseData } = location?.state;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [AddLanguageLable, setAddLanguageLable] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  console.log("AddLanguageId", languagesId, UidData, CourseData);

  useEffect(() => {
    //   GetUserDetailes();
    setUserData(CourseData);
  }, []);

  useEffect(() => {
    ViewTranslationList();
  }, []);

  //  get api call language details lable
  const ViewTranslationList = async () => {
    let LanguageIdData = { LanguageId: CourseData?.LanguageId };
    const response = await axios.post(`${baseUrl}ViewTranslation`,LanguageIdData);
    // console.log("response?.data?.ViewTranslation",response?.data?.ViewTranslation)
    try {
      if (Object.keys(response?.data?.ViewTranslation).length != 0) {
        setAddLanguageLable(response?.data?.ViewTranslation);
      } else {
        console.log("api error in LanguageId list");
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  const startServerTime = async (userData, trainingId, AddLanguageLable) => {
   if (!userData || !trainingId) {
        console.error("Missing user data or training ID.");
        return;
      }
    const data = {
      empcode: userData.EmployeeCode,
      trainingid: trainingId,
      projectcode: userData.project,
    };
    console.log("data----------s", data);
    try {
      let response = await axios.post(baseUrl + "TrainingStartTime", data);
      if (response.data.TrainingStartTime[0].Message == "Success") {
        toast.success("Training Start");
        setTimeout(() => {
          navigate("/Videos", {
            state: {
              userData,
              trainingId: trainingId,
              AddLanguageLable,
            },
          });
        }, 1500);
      } else {
        console.error("not start tarining video error:", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <ToastContainer />

      {/* Navbar */}
      <nav className="bg_col shadow-sm py-2 px-4 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-dark-100 text-white"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="logo_height">
              <img w="100%" height="100%" src={cpmlogo} />
            </div>

            {/* <h1 className="text-xl font-bold ml-4 text-white">Learning Sphere</h1> */}
          </div>
       
          <div className="flex  items-center gap-4">
          <button className="p-2 rounded-full  text-white">
              {/* <span className="sr-only text-white">User profile</span> */}
               <span className="sr-onl bg-whit text-white ms-3"> 👤  {AddLanguageLable.Welcometo} {userData.EmployeeDisplayName}</span>
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
                <span>{AddLanguageLable?.UserProfile}</span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm"
                aria-labelledby="userProfileDropdown"
              >
                {/* <li>
                <h6 className="dropdown-header">User Information</h6>
              </li> */}
                <li>
                  <a className="dropdown-item">
                    <strong>{AddLanguageLable?.Name}:</strong>{" "}
                    {userData.EmployeeDisplayName}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    <strong>{AddLanguageLable?.ProjectCode}:</strong>{" "}
                    {userData.project}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* <li>
                <a className="dropdown-item text-danger" onClick={logouts}>Log out</a>
              </li> */}
              </ul>
            </div>
           
          </div>
        </div>
      </nav>
      <div className="flex pt-14 ">
        <SideBaar isOpen={sidebarOpen} languageLabels={AddLanguageLable} />

        {/* Main content */}
        <main className={`flex-1 p-6 ${sidebarOpen ? 'ml-20 ' : 'ml-20'} transition-all duration-300  z-index-0`}>
        
          <div className="container-flui flex-grow-1  d-flex align-items-center justify-content-center  ">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 mt-sm-">
              <div
                      className="d-flex align-items-center text-primary my-4 my-md-0 "
                      onClick={() => navigate("/Dashboard", { state: { userDataBack: userData } })}
                    >
                      <ArrowLeft className="me-2" size={18} />
                      <h6 className="mt-2">{AddLanguageLable?.back}</h6>
                    </div>
                <div className="card">
                  <div className="card-header bg-gray text-dark fw-bold text-center p-3 ">
              
                    <h4 className="mb-0 fw-bold">{userData.trainingname}</h4>
                  </div>
                    
                  <div className="card-body ">
                    <h3 className="fs-5 fw-bold mb-4">
                      {AddLanguageLable?.VideoInformation}
                    </h3>
                    <div className="row">
                      {/* {userData?.trainings?.map((item, index) => ( */}
                      <div className="col-12 col-md-12 mb-">
                        <div className="card h-100 shadow-sm">
                          <div className="card-body">
                            <div className="row mt-2">
                              <div className="col-12 col-md-12  mb-3">
                                <div className="d-flex align-items-center">
                                  <CheckCircle
                                    className="text-success me-2"
                                    size={18}
                                  />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable?.TrainingName} :
                                    </div>
                                    <div>{userData.trainingname}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6  mb-3">
                                <div className="d-flex align-items-center">
                                  <CheckCircle
                                    className="text-success me-2"
                                    size={18}
                                  />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable?.CompletedTraining}:
                                    </div>
                                    <span className="badge bg-success">
                                      {userData?.completionstatus}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <Clock
                                    className="text-warning me-2"
                                    size={18}
                                  />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable.VideoDuration} :
                                    </div>
                                    <div>{userData.videoduration}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6  mb-3">
                                <div className="d-flex align-items-center">
                                  <Clock
                                    className="text-primary me-2"
                                    size={18}
                                  />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable?.VideoSeenDuration}
                                    </div>
                                    <div>
                                      {userData?.videoseenduration || "0"}{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <Clock
                                    className="text-secondary me-2"
                                    size={18}
                                  />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable?.StartDate}:
                                    </div>
                                    <div>{userData.trainingstartdate}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <Clock className="text-info me-2" size={18} />
                                  <div className="d-flex ">
                                    <div className="fw-semibold me-2">
                                      {AddLanguageLable?.ExpiryDate}:
                                    </div>
                                    <div>{userData.trainingexpirydate}</div>
                                  </div>
                                </div>
                              </div>

                              {userData.completionstatus == "Yes" ? (
                                <div className="d-grid mt-4">
                                  <button className="btn btn-success video-disabled btn-lg d-flex align-items-center justify-content-center">
                                    <CheckCircle
                                      className="text-white me-2"
                                      // size={18}
                                    />
                                    <span>{AddLanguageLable?.Completed} !</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="d-grid mt-4">
                                  <button
                                    onClick={() => {
                                      startServerTime(
                                        userData,
                                        userData?.trainingid,
                                        AddLanguageLable
                                      );
                                    }}
                                    className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                                  >
                                    <Play className="me-2" />
                                    <span>
                                      {AddLanguageLable?.StartTrainingVideo}
                                    </span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TraningDetails;
