import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userIdContext } from "../context/context";
import FormattedText from "./FormattedText"; // Import the FormattedText component
import down from "../assets/down.png"
import loading from "../assets/loading.png"

const BloodReport = () => {
  const { idC, setIdC } = useContext(userIdContext);
  const [file, setFile] = useState();
  const [reportInfo, setReportInfo] = useState();
  const [spin, setSpin] = useState(false);
  const [hid, setHId] = useState(0);

  const [disableHistoryButton, setDisableHistoryButton] = useState(false)

  function handleImage(e) {
    setFile(e.target.files[0]);
  }
  
  const handleImageSubmit = async () => {
    
    const formData = new FormData();
    formData.append("image", file);

    setSpin(true); // Show spinner while uploading and fetching data

    try {
      const response = await axios.post("/user/setphoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from backend = ", response.data);
    } catch (error) {
      console.log("Error Occurred while posting data - ", error);
    }

    try {
      const response = await axios.get("/user/getreport");
      console.log(response.data);
      console.log(response.data.data);
      setReportInfo(response.data.data);
      setDisableHistoryButton(false);
    } catch (error) {
      console.log("Error while fetching data = ", error);
    }

    setSpin(false); // Hide spinner after data is fetched
  };

  const handleHistorySubmit = async (e) => {
    setDisableHistoryButton(true)
    e.preventDefault();

    try {
      const resp = await axios.post("/user/updatehistory", {
        idC,
        hid,
        reportInfo,
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`/user/gethistory/${idC}`)
      .then((response) => {
        setHId(response.data.data.length + 1);
        console.log("Current Id = ", response.data.data.length);
      })
      .catch((error) => {
        console.log("Error while fetching data = ", error);
      });
  }, [reportInfo, hid]);

  return (
    <div className="bg-[#afe4e4] h-screen">
      <header>
        <div className="flex justify-between items-center h-auto bg-[#1FC8C6] w-screen">
          <div className="text-[#11556E] text-2xl font-customFont my-4 mx-4 sm:text-4xl md:text-6xl">
            Medical Report Diagnosis
          </div>
          <div className="flex">
            <div className="text-sm md:text-lg text-[#E3F5F3] font-bold mx-2 ml-2 border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md hover:text-[#11556E] shadow-md shadow-[#11556E] ">
              <Link to="/">Home</Link>
            </div>
            <div className="text-sm md:text-lg text-[#E3F5F3] font-bold mx-2 ml-2 mr-10 border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md hover:text-[#11556E] shadow-md shadow-[#11556E] ">
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </div>
        <div className="h-1 w-screen bg-slate-950"></div>
      </header>
      <main>
        <div className="flex flex-col justify-center items-center w-screen bg-[#afe4e4]">
          <h1 className="font-bold text-lg lg:text-4xl my-10 text-[#11556E]">
            Blood Report Checker
          </h1>
          <input
            type="file"
            className="my-8 text-lg transition hover:scale-105 duration-700"
            onChange={handleImage}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Preview"
              className="hover:border-2 hover:border-[#E3F5F3] hover:rounded-lg h-[13rem] sm:h-[18rem] md:h-[20rem]"
            />
          )}
          <button
            className="flex justify-evenly items-center text-sm md:text-lg text-[#E3F5F3] font-bold mx-2 ml-2 border-2 px-5 py-2 bg-[#1FC8C6] border-[#E3F5F3] rounded-md mt-10 disabled:bg-[#99d0cf]"
            disabled={!file || spin} // Disable button while loading
            onClick={handleImageSubmit}
          >
            Submit
          </button>
          {spin && (
            <div className="animate-spin w-10 flex justify-center items-center mt-10">
              <img src={loading} alt="" />
            </div>
          )}

          {file && !spin &&(
            <>
            <div className="flex ">
            <img src={down} className="w-10 animate-bounce mx-2" alt="" />
            <div className="font-bold my-2 w-auto ">Check results down below</div>
            <img src={down} className="w-10 animate-bounce mx-2" alt="" />
            </div>
            </>
          )

          }
          {reportInfo && !spin && (
            <>
              <div>
                {disableHistoryButton?(<>
                <button
                  className="text-sm md:text-lg text-[#E3F5F3] font-extrabold mx-2 ml-2 border-2 px-5 py-2 bg-[#1FC8C6] border-[#E3F5F3] rounded-md mt-10 disabled:bg-[#99d0cf]"
                >
                  Done
                </button>

                </>):(<>

                <button
                  className="text-sm md:text-lg text-[#E3F5F3] font-bold mx-2 ml-2 border-2 px-5 py-2 bg-[#1FC8C6] border-[#E3F5F3] rounded-md mt-10 disabled:bg-[#99d0cf]"
                  onClick={handleHistorySubmit}
                >
                  Make History
                </button>
                </>)

                }
              </div>
              <div className="font-bold text-2xl mt-10 text-[#11556E] px-[25%]">
                <FormattedText text={reportInfo} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BloodReport;
