import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Clock, User } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Menu, X, BookOpen, Upload } from 'lucide-react';
import cpmlogo from '../Images/cpmlogo.png'
import SideBaar from "./SideBaar";

function VideoPlayer() {
  let baseUrl = "https://api1.parinaam.in/api/Training/";




  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [QuestionPage, setQuestionPage] = useState(false);
  const [isSeekingDisabled, setIsSeekingDisabled] = useState(false);
  console.log("isSeekingDisabled",isSeekingDisabled)

  const location = useLocation();
  const Navigate = useNavigate();
  const { userData, trainingId,AddLanguageLable } = location.state;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
     setSidebarOpen(!sidebarOpen);
   };

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  console.log("AddLanguageLable---00", userData, trainingId,AddLanguageLable);

  //  insert and update selected question data
  const handleSelect = (QuestionId, answerText) => {
    let val =JSON.parse(answerText)
    const {AnswerId,Answer,RightAnswer}= val
    // console.log("QuestionId, answerText",QuestionId, AnswerId,Answer,RightAnswer)
    setSelectedAnswers((prevState) => {
      const updatedAnswers = prevState.filter(
        (answer) => answer.QuestionId !== QuestionId
      );
      return [...updatedAnswers, { QuestionId,AnswerId,Answer,RightAnswer }];
    });
  };

  //  submit data  and end time server api call
  const submitTrainingData =async (e) => {
    e.preventDefault();
    if(selectedAnswers.length ===0){
      toast.error("please select your Question")
      return
    }
    const data ={
       projectcode: userData.project ,
      trainingid: trainingId,
      empcode: userData.EmployeeCode,
      JsonData:selectedAnswers
       }
             console.log("response----------",data)
       const response = await axios.post(baseUrl+"SubmitTrainingQuestion", data);
      //  console.log("response----------",response)
       try {
        if(response.data.SubmitTrainingQuestion[0].Message ==="Success"){
          toast.success("Submit data Successfully");
          const endTimeData = {
            empcode: userData.EmployeeCode ,
            trainingid: trainingId,
            projectcode: userData.project|| "59975", 
          };
          const response = await axios.post(baseUrl+"TrainingEndTime", endTimeData);
          try {
          if(response.data.TrainingEndTime[0].Message == "Success"){
            console.log("server end time save in database")
          } else {
            console.log("Error submitting data: API error");
          }
      
        } catch (error) {
          console.log("Error in SubmitTrainingQuestion API call:", error);
        }
          
          setTimeout(() => {
            Navigate("/Dashboard")
          }, 1500);
          

        }else{
          console.log("error submit data eroor api" )
        }
        
       } catch (error) {
        console.log(error)
        
       }
  };


  // const training = userData 
  console.log("training.videoseenduration", userData);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("video", userData.videoseenduration?.toString()||0);
    }
  }, [userData]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const savedTime = localStorage.getItem("video");
      if (savedTime) {
        const parsedTime = parseFloat(savedTime);
        videoRef.current.currentTime = parsedTime;
        setCurrentTime(parsedTime);
      }
    }
  };

  const handleTimeUpdate = async () => {
    if (videoRef?.current) {
      setCurrentTime(videoRef.current.currentTime);

      const VideoSeenDurationData = Math.floor(videoRef.current.currentTime);
      const data = {
        projectcode: userData.project || "59975",
        trainingid: trainingId,
        empcode: userData.EmployeeCode,
        VideoSeenDuration: VideoSeenDurationData,
      };
      console.log("data----------00000", data);

      localStorage.setItem("video", VideoSeenDurationData.toString());

      try {
        // Check if video has ended
        const currentTime = Math.floor(videoRef.current.currentTime);
        const duration = Math.floor(videoRef.current.duration); // Make sure `duration` is defined correctly

        // Call API while video is playing
        if (currentTime === duration) {
          return;
        }
        const response = await axios.post(baseUrl+"VideoSeenDuration", data);

        if (response?.data?.VideoSeenDuration?.[0]?.Message === "Success") {
          console.log(
            "Server Message:",
            response.data.VideoSeenDuration[0].Message
          );
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  //  video seeking stop

  const handleSeeking = () => {
    if (videoRef.current) {
      // If the user seeks beyond the current allowed time, reset the position
      if (videoRef.current.currentTime > currentTime) {
        videoRef.current.currentTime = currentTime;
        setIsSeekingDisabled(true); // Disable pointer
        setTimeout(() => setIsSeekingDisabled(false), 1000); // Reset after 1 second
      }
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
    <ToastContainer/>
  

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
            <div className='logo_height'>
            <img w="100%" height="100%"  src={cpmlogo}/>
            </div>
            
            {/* <h1 className="text-xl font-bold ml-4 text-white">Learning Sphere</h1> */}
          </div>
          <div className="flex items-center gap-4">
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
                <a className="dropdown-item" >
                  <strong>{AddLanguageLable?.Name}:</strong> {userData.EmployeeDisplayName}
                 
                </a>
              </li>
              <li>
                <a className="dropdown-item" >
                  <strong>{AddLanguageLable?.ProjectCode}:</strong> {userData.project}
                  
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
           
            </ul>
          </div>
        
          </div>
        </div>
      </nav>
      <div className="flex pt-14">
        {/* Sidebar */}
        <SideBaar 
        isOpen={sidebarOpen}
        languageLabels={AddLanguageLable}

        />

<main className={`flex-1    ${
          sidebarOpen ? 'ml-20' : 'ml-20'
        } transition-all duration-300`}>
      {QuestionPage ? (
        <div className="container  mb-5 mt-5 mt-md-0">
          {userData?.QuestionList?.map((question) => {
            const selectedAnswer = selectedAnswers.find(
              (answer) => answer.QuestionId === question.QuestionId
            );
            return (
              <Card key={question.qid} className="mb-3 mt-3">
                <Card.Body>
                  <Card.Title>{AddLanguageLable.Question} {question.QuestionId}</Card.Title>
                  <Card.Text>{question.Question}</Card.Text>
                  <DropdownButton
                    className="mt-3"
                    id={`dropdown-${question.QuestionId}`}
                    
                    title={
                      selectedAnswer
                        ? selectedAnswer.Answer
                        : AddLanguageLable?.Selectananswer
                    }
                    onSelect={(e) => handleSelect(question.QuestionId, e)}
                    variant="primary"
                  >
                    {question.Answers.map((answer) => (
                      <Dropdown.Item
                        key={answer.AnswerId}
                        eventKey={JSON.stringify({AnswerId:answer.AnswerId,Answer:answer.Answer,RightAnswer:answer.RightAnswer})}
                      >
                        {answer.Answer}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Card.Body>
              </Card>
            );
          })}

          <div className="d-flex w-100 justify-content-end mt-4">
            <button
              className="btn btn-primary px-3"
              onClick={submitTrainingData}
            >
              {AddLanguageLable?.SumbitData}
            </button>
          </div>
        </div>
      ) : (
        <div className="container mt-5 mt-md-0 ">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center mt-4">
              <div className="card shadow-lg">
                <div className="card-header bg-gray text-dark">
                  <h5 className="mb-0">
                  {AddLanguageLable?.TrainingDashboard} : {userData?.trainingname}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="position-relative">
                    <video
                      ref={videoRef}
                      controls
                      className={`img-fluid w-100 ${isSeekingDisabled ? "video-disabled" : ""}`}
                      // className="img-fluid w-100"
                      onLoadedMetadata={handleLoadedMetadata}
                      onTimeUpdate={handleTimeUpdate}
                      onSeeking={handleSeeking}
                      style={{ borderRadius: "10px" }}
                    >
                      <source src={userData?.videolink} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-3">
                    <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-2">
                      <div className="d-flex align-items-center">
                        <Clock className="text-primary me-2" size={18} />
                        <span className="fw-semibold">{AddLanguageLable?.CurrentTime}:</span>
                        <span className="ms-2">
                          {" "}
                          {currentTime.toFixed(2)} {AddLanguageLable?.seconds}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Clock className="text-warning me-2" size={18} />
                        <span className="fw-semibold">{AddLanguageLable?.TotalDuration} :</span>
                        <span className="ms-2">
                          {" "}
                          {duration.toFixed(2)} {AddLanguageLable?.seconds}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-end mt-4">
                      { duration && currentTime.toFixed(2) === duration.toFixed(2) && (
                        <button
                          className="btn btn-primary px-3"
                          onClick={() => setQuestionPage(true)}
                        >
                       {AddLanguageLable?.NextStep}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
      </div>
    </div>
  );
}

export default VideoPlayer;
