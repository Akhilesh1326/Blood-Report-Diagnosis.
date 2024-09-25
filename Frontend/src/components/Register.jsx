import React, { useState, useContext, useEffect } from "react";
import medImg from "../assets/medImg5.png";
import axios from "axios";

import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [inputError, setInputError] = useState("");
  const [checkDataRepeat, setCheckDataRepeat] = useState("");
  const [success, setSuccess] = useState("");

  const validateInput = (name, email, password, gender, age) => {
    const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/
    if (name === "") {
      setInputError("Name field is Blank");
      return false;
    } else if (email === "") {
      setInputError("Email Field Is Blank");
      return false;
    } else if (!emailRegex.test(email)) {
      setInputError("Invalid email address. Please enter a valid email.");
      return false;
    } else if (password === "") {
      setInputError("Password field is Blank");
      return false;
    } else if (password.length < 8) {
      setInputError("Password should be 8 characters long");
      return false;
    } else if (gender === "") {
      setInputError("Gender field is Blank");
      return false;
    } else if (age === 0) {
      setInputError("Enter Your Age");
      return false;
    } else if (age < 13 || age > 90) {
      setInputError("Age Entry is invalid, Must be in Range of 13-90");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput(name, email, password, gender, age)) {
      console.log("Entry Granted");
      try {
        const response = await axios.post("/user/login/register", {
          name,
          email,
          password,
          gender,
          age,
        });
        console.log("Response from backend = ", response);
        if (response.data.msg === "Data Repetition") {
          setCheckDataRepeat(
            "User Already Present, Try again with Different User Name"
          );
        } else {
          console.log("Data NOT repeated");
          setSuccess("You've Successfuly Registered");

          // Set General Info in context for other pages to notify data

          console.log("Field has been reset");

          // Reset fields after successful submission
          setName("");
          setCheckDataRepeat("");
          setInputError("");
          setEmail("");
          setPassword("");
          setGender("");
          setAge(0);
          setInputError("");
        }
      } catch (error) {
        console.log("Error Occurred while posting data - ", error);
      }
    } else {
      console.log("Validation error occurred");
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
      <div className="bg-gray-600 bg-opacity-50 px-10 text-center rounded-lg border-4 border-slate-200 shadow-2xl shadow-blue-950 transition ease-in-out delay-150 hover:-translate-y-1 duration-300">
        <p className="text-green-500 font-bold text-md">{success}</p>
        <h1 className="font-bold mt-4 text-2xl text-gray-100">User Register</h1>

        <p className="mt-5 mb-2 font-bold text-white">UserName</p>
        <input
          id="nameInput"
          type="text"
          value={name} 
          className="rounded-md outline-none border-2 bg-slate-900 text-white px-2 py-1"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="mt-2 mb-2 font-bold text-white">Email</p>
        <input
          type="email"
          value={email}
          className="mb-1 rounded-md bg-gray-900 border-2 outline-none text-white px-2 py-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="mt-2 mb-2 font-bold text-white">Password</p>
        <input
          type="password"
          value={password}
          className="rounded-md outline-none border-2 bg-slate-900 text-white px-2 py-1"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="mt-2 mb-2 font-bold text-white">Gender</p>
        <select
          value={gender}
          className="mb-1 rounded-md bg-gray-900 border-2 outline-none text-white px-2 w-[200px] py-1 text-center"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <p className="mt-2 mb-2 font-bold text-white">Age</p>
        <input
          type="number"
          value={age}
          className="mb-10 rounded-md bg-gray-900 border-2 outline-none text-white px-2 py-2"
          onChange={(e) => setAge(parseInt(e.target.value))}
        />

        {success ? (
          <>
            <button
              type="submit"
              className="flex m-auto mb-4 border-2 rounded-md px-8 py-2 font-bold bg-green-600 text-white hover:bg-green-900 transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
              onClick={handleSubmit}
            >
              <Link to="/login">Go To Login</Link>
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="flex m-auto mb-4 border-2 rounded-md px-8 py-2 font-bold bg-gray-900 text-white hover:bg-gray-800 transition ease-in-out delay-100 hover:scale-125 duration-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <p className="font-bold text-md">
          Already Have an Account{" "}
          <Link to="/login" className="text-blue-600">
            LogIn{" "}
          </Link>
          Here
        </p>
        <p className="text-red-500 font-bold text-md">{inputError}</p>
        <p className="text-red-500 font-bold text-md">{checkDataRepeat}</p>
      </div>
    </div>
  );
};

export default Register;
