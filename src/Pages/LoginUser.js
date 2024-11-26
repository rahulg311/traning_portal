import {
  Form,
  Button,
  Navbar,
  nav,
  Container,
  Carousel,
  Table,
  card,
} from "react-bootstrap";
import { FaIdCard } from "react-icons/fa6";
// import logo from "../Images/Group406.png";
// import logos from "../Images/logo_1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

import { Input } from "antd";
import { ServicesApi } from "./Api";

function LoginUser({ setToken }) {
  const navigate = useNavigate();
  const GetUserDetails = sessionStorage.getItem("token");

  console.log("GetUserDetails", GetUserDetails);

  const [UserLogin, setUserLogin] = useState({
    UserName: "",
    Password: "",
  });
  //----------- handle change data ---------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...UserLogin, [name]: value });
  };

  //----------- user login  ---------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let apiUrl = baseUrl + MethodNames.CheckUserExists;
  //   console.log("apiUrl", apiUrl);
  //   let res = await ServicesApi(apiUrl, UserLogin);
  //   console.log("res------", res.CheckUserExists[0].Message);
  //   try {
  //     if (res.CheckUserExists[0].Message === "Incorret Password") {
  //       toast.error(" Worng UserId Password");
  //     } else if (res.CheckUserExists[0].Message === "Login Successfully") {
  //       toast.success(" Login to Successfully");
  //       sessionStorage.setItem("token", UserLogin.UserName);
  //       // sessionStorage.setItem('UserDetails', JSON.stringify((res?.UserLogin)))
  //       const GetUserDetailss = sessionStorage.getItem("token");
  //       await setToken(UserLogin.UserName);
  //       console.log("GetUserDetailss", GetUserDetailss);
  //       setTimeout(() => {
  //         if (GetUserDetailss === "report-admin") {
  //           navigate("/Reports");
  //         } else {
  //           navigate("/GiwaDetails");
  //         }
  //       }, 2000);
  //       setUserLogin({
  //         UserName: "",
  //         Password: "",
  //       });
  //     } else {
  //       toast.error(" User ID does not match");
  //     }
  //   } catch (error) {
  //     toast.error(res.error);
  //     console.log(error);
  //   }
  // };

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(UserLogin.UserName){
      toast.error(" Worng UserId Password");
      return
    }


  }

  return (
    <>
      <div className="App backgoundloginss  vh-100">
        <ToastContainer />

        {/* <div className="headerLogin text-white row md:flex justify-between">
          <div className="col-md-5 flex p px-5">
            <img src={logo} className="loginLogo mr-2" />
            <h6 className="text-white ml-2 mt-3 mt_20 text-xl">GIWA Awards Jury</h6>
          </div>
        </div> */}

        <div className="flex flex-col items-center justify-center   p-3  h-lvh">
          <div>
            {/* <img  width={150} height={150} src={logos} alt="image"/> */}
          </div>
          <div className="bg-white cardContainer p-6 max-w-sm w-full ">
            <h3 className="mb-1 text-2xl font-bold text-center">
              User Sign in
            </h3>

            <Form onSubmit={handleSubmit}>
              <div className="mb-3 px-2 mt-8">
                <div className="flex items-center border- border-gray-300 py-2">
                  <input
                    class="w-full px-2 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    type="text"
                    name="UserName"
                    value={UserLogin.UserName}
                    onChange={(e) => handleChange(e)}
                    placeholder="User Id"
                    required
                  />
                </div>
                <div className="flex items-center border- border-gray-300 py-2">
                  <Input.Password
                    size="large"
                    type="password"
                    name="Password"
                    value={UserLogin.Password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <button className="bg-blue-700  text-white px-4 py-2 rounded-md  w-full">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
