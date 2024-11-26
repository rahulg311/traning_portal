import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSelectionCard = () => {
  let navigate = useNavigate();
  const [LanguageListData, setLanguageListData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  let baseUrl = "https://api1.parinaam.in/api/Training/TrainingLanguageList";
  //  let UID= "BE7DA936-EAF5-4958-9E4C-EBA2350BEB4D"

  const[UidData,setUidData] = useState(null)
  const currentLocation = useLocation(); // Renaming to avoid conflict
   useEffect(()=>{
    const searchParams = new URLSearchParams(currentLocation?.search);
    const UID = searchParams.get("id");
    if (UID) {
      setUidData(UID)
    }
   
   },[currentLocation])
  

  useEffect(() => {
    LanguageList();
    sessionStorage.clear()
  }, []);

  const LanguageList = async () => {
    let data = {};

    try {
      const response = await axios.post(baseUrl, data);
      setLanguageListData(
        JSON.parse(response?.data?.TrainingLanguageList[0]?.Data)
      );
    } catch (error) {
      console.error("Error fetching language list:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLanguage != "") {
      navigate("./Dashboard", { state: { languagesId: selectedLanguage ,UidData} });
    }
    console.log("Selected language:", selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="p-3 border-b border-gray-500 bg_col text-white text-center ">
          <h1 className="text-2xl font-bold text-center text-white-800">
          Select Language 
          </h1>
        </div>
        <p className="text-center text-gray-600 mt-2">
          Please choose your preferred language
        </p>

        {/* Card Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <select
                  required
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Language
                  </option>
                  {LanguageListData &&
                    LanguageListData?.map((lang) => (
                      <option key={lang.LanguageId} value={lang.LanguageId}>
                        {lang.Language}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Card Footer */}
        <div className="p-6 bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={selectedLanguage != "" ? false : true}
            className={` ${
              selectedLanguage != "" ? "bg-blue-700" : "bg-blue-400"
            } cursor-not-allowed w-full bg-blue-400 text-white py-2 px-4 rounded-lg  transition-colors duration-200 font-medium`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionCard;
