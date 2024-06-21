import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  userAgeContext,
  userEmailContext,
  userGenderContext,
  userNameContext,
  userIdContext,
} from "../context/context";

import male from "../assets/male_profile.png";
import female from "../assets/woman_profile.png";
import trans from "../assets/trans_profile.png";

const Profile = () => {
  const { idC } = useContext(userIdContext);
  const { nameC, setNameC } = useContext(userNameContext);
  const { emailC } = useContext(userEmailContext);
  const { genderC } = useContext(userGenderContext);
  const { ageC } = useContext(userAgeContext);

  const [serverHData, setServerHData] = useState([]);
  const [hData, setHData] = useState('');
  const [hid, setHId] = useState(0);

  const handleDisplayHistory = async (e) => {
    try {
      const response = await axios.get(`/user/gethistory/${idC}`);
      // setHData(response.data.data[0].reportData);
      // console.log('REPORT HISTORY = ', response.data.data[0].reportData);

      setServerHData(response.data.data); // assuming response.data.data is the array of history data
      // console.log("SERVER DATA = ", response.data.data[0].reportData)
      setHId(response.data.data.length + 1);
      console.log(response.data);
    } catch (error) {
      console.log("Error while fetching data = ", error);
    }
  }

  return (
    <div className='bg-[url("/src/assets/profile_image.png")] bg-repeat'>
      <div className="flex flex-col justify-center items-center min-h-screen py-8">
        <div className="border-4 border-slate-600 rounded-xl w-auto sm:w-[50%] lg:h-[40rem] shadow-xl shadow-[#11556E]">
          <div className="flex justify-evenly items-center mb-16">
          <Link to='/'><div className="my-2 sm:py-2 sm:px-4 md:py-3 md:px-6 lg:py-3 lg:px-7 lg:text-xl md:text-lg rounded-lg backdrop-saturate-150 font-bold peer-only:y-2 px-4 shadow-md shadow-[#11556E] backdrop-blur-none text-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100 hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500">
              Home
            </div></Link>
            {genderC == "male" ? (
              <img
                src={male}
                alt="Icon"
                className="my-2 w-20 sm:w-24 md:w-28 lg:w-32 border-6 border-black rounded-full shadow-lg shadow-[#11556E]"
              />
            ) : genderC == "female" ? (
              <img
                src={female}
                alt="Icon"
                className="my-2 w-20 sm:w-24 md:w-28 lg:w-32 border-6 border-black rounded-full shadow-lg shadow-[#11556E]"
              />
            ) : (
              <img
                src={trans}
                alt="Icon"
                className="my-2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 border-2 border-black rounded-full"
              />
            )}
            <Link to='/' onClick={()=>{setNameC("")}}><div className="my-2 sm:py-2 sm:px-4 md:py-3 md:px-6 lg:py-3 lg:px-7 lg:text-xl md:text-lg rounded-lg backdrop-saturate-150 font-bold peer-only:y-2 px-4 shadow-md shadow-[#11556E] text-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100 hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500">
              Logout
            </div></Link>
          </div>
          <p className="font-semibold text-lg ml-4 w-[90%] my-6 text-[#11556E] px-2 rounded-xl shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 backdrop-saturate-100">
            Name
            <p className="font-bold ml-8 mb-4 md:mb-2 text-xl">{nameC}</p>
          </p>

          <p className="font-semibold text-lg ml-4 w-[90%] my-6 text-[#11556E] px-2 rounded-xl shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 backdrop-saturate-100">
            Email
            <p className="font-bold ml-8 mb-4 md:mb-2 text-xl">{emailC}</p>
          </p>
          <p className="font-semibold text-lg ml-4 w-[90%] my-6 text-[#11556E] px-2 rounded-xl shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 backdrop-saturate-100">
            Gender
            <p className="font-bold ml-8 mb-4 md:mb-2 text-xl">{genderC}</p>
          </p>
          <p className="font-semibold text-lg ml-4 w-[90%] my-6 text-[#11556E] px-2 rounded-xl shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 backdrop-saturate-100">
            Age
            <p className="font-bold ml-8 mb-4 md:mb-2 text-xl">{ageC}</p>
          </p>
          <div className="flex justify-center my-4 mx-10">
            <button className="rounded-lg py-3 px-5 backdrop-saturate-150 text-[#11556E] font-bold shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100 hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500"
              onClick={handleDisplayHistory}>
              Check History
            </button>
          </div>
        </div>
        
          <table className=" my-10 border-4 border-slate-600 rounded-2xl w-[50%] ">
            <thead>
              <tr>
                <th className="bg-[#1FC8C6] border-4 border-slate-600 py-2 px-4">Index No.</th>
                <th className="bg-[#1FC8C6] border-4 border-slate-600 py-2 px-4">Report History Data</th>
              </tr>
            </thead>
            <tbody  className="bg-[#1FC8C6] bg-opacity-25">
              {serverHData.map((item, index) => (
                <tr key={index} >
                  <td className="text-[#11556E] font-bold border-4 border-slate-600 py-1 px-2 text-center">{index + 1}</td>
                  <td className="text-[#11556E] font-semibold border-4 border-slate-600 py-1 px-2 md:text-lg">{JSON.stringify(item.reportData)}</td> {/* Adjust based on actual data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
