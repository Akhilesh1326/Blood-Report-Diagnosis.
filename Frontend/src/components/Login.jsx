import { React, useContext, useState } from "react";
<<<<<<< HEAD
import medImg from "../assets/medImg5.png";
=======
import medImg from "E:/Codes/All_Project/Report_Rec/Frontend/src/assets/medImg5.png";
>>>>>>> df413913b3aa892e4fa38f828ad0248b69c1b0ed
import {
  userNameContext, userAgeContext, userEmailContext, userGenderContext, userPasswordContext, userIdContext} from "../context/context";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const { nameC, setNameC } = useContext(userNameContext);
  const { emailC, setEmailC} = useContext(userEmailContext);
  const { genderC, setGenderC } = useContext(userGenderContext);
  const { ageC, setAgeC } = useContext(userAgeContext);
  const { passC, setPassC } = useContext(userPasswordContext);
  const { idC, setIdC } = useContext(userIdContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkLogin, setCheckLogin] = useState("");
  const [inputError, setInputError] = useState("");

  const validateInput = (name, password) => {
    if (name === "") {
      setInputError("Name field is Blank");
      return false;
    }  else if (password === "") {
      setInputError("Password field is Blank");
      return false;
    } else if (password.length < 8) {
      setInputError("Password should be 8 characters long");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {

    e.preventDefault();
    if (validateInput(name, password)){
    try {
      const response = await axios.post("user/login/loginwithname", {
        name,
        password,
      });

      console.log("Response from backend = ", response);
      console.log("msg = ",response.data.msg)
      if(response.data.msg === "present"){
        console.log("Resetting data ");
        
        const age = response.data.user_info.age;
        const email = response.data.user_info.email;
        const gender = response.data.user_info.gender;
<<<<<<< HEAD
        const userId = response.data.user_info.userId;
        console.log(userId)
=======
        const userId = response.data.user_info.userRegisterId;
        // console.log(age)
>>>>>>> df413913b3aa892e4fa38f828ad0248b69c1b0ed
        setAgeC(age);
        setEmailC(email)
        setGenderC(gender)
        setNameC(name);
        setPassC(password);
        setIdC(userId);

        setCheckLogin("Successfully Loged In")
        }
        else{
          setCheckLogin("Invalid UserName or Password")
          console.log("User is not present");
          }
        // Clear state values
      setName("");
      setPassword("");
    } catch (error) {
      console.log("Error occured while check the input of the Login", error);
    }
  }
  };

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${medImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-600 bg-opacity-50 px-10 text-center rounded-lg border-4 border-slate-200 shadow-2xl shadow-blue-950 transition ease-in-out delay-150 hover:-translate-y-1  duration-300">
        <p className="text-green-500 font-bold text-md">{checkLogin}</p>
        <h1 className="font-bold mt-4 text-2xl text-gray-100">User Login</h1>

        <p className="mt-5 mb-2 font-bold text-white">UserName</p>
        <input
          type="text"
          value={name}
          className="rounded-md outline-none border-2 bg-slate-900 text-white px-2 py-1"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="mt-5 mb-2 font-bold text-white">Password</p>
        <input
          type="password"
          value={password}
          className="mb-10 rounded-md bg-gray-900 border-2 outline-none text-white px-2 py-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        {checkLogin==="Successfully Loged In"?(
          <>
        <button
          
          className="flex m-auto mb-4 border-2 rounded-md px-8 py-2 font-bold bg-green-600 text-white hover:bg-green-900 transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
          onClick={handleLoginSubmit}
        >
          <Link to="/">Go To HomePage</Link>
        </button>
        </>
        ):(
          <>
        <button
          
          className="flex m-auto mb-4 border-2 rounded-md px-8 py-2 font-bold bg-gray-900 text-white hover:bg-gray-800 transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
          onClick={handleLoginSubmit}
        >
          Submit
        </button>
        <p className="text-red-500 font-bold text-md">{inputError}</p>
          </>

        )

        }
<p className="font-bold text-md">New Here<Link to="/register" className="text-blue-600"> Register </Link>Here</p>
      </div>
    </div>
  );
};

export default Login;
