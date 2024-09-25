import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userNameContext,userAgeContext } from "../context/context";
// import headingImg from "../assets/heading_img.jpg";

import email from "../assets/mail.png";
import phone from "../assets/call.png";
import address from "../assets/location.png";

import instagram from "../assets/instagram.png";
import x from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

import boy from "../assets/boy.png";
import girl from "../assets/woman.png";

// {nameC?(
//   <>
//   <div>Hello{nameC}</div>
//   </>
// ):(<></>)}

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    });

    scrollObserver.observe(ref.current);

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);

  const classes = `transition-opacity delay-500 duration-1000 
      ${isVisible ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

const Main = () => {
  const { nameC, setNameC } = useContext(userNameContext);
  return (
    <>
      <div className="bg-[#DDF8F8] w-screen">
        <header>
          <div className="flex  justify-between items-center h-auto bg-[#1FC8C6]">
            <div className="text-[#11556E] text-2xl font-customFont my-4 mx-4 sm:text-4xl md:text-6xl">
              Medical Report Diagnosis
            </div>
            {nameC ? (
              <>
                <div className="flex">
                  <button
                    className="text-sm md:text-lg text-[#E3F5F3] font-bold mx-2  border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md hover:text-[#11556E] shadow-md shadow-[#11556E]"
                    onClick={() => {
                      setNameC("");
                    }}
                  >
                    Logout
                  </button>
                  <div className="text-sm md:text-lg mr-10 text-[#E3F5F3] font-bold mx-2 ml-2 border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md hover:text-[#11556E] shadow-md shadow-[#11556E]">
                    <Link to="/profile">Profile</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <div className="text-sm md:text-lg text-[#E3F5F3] font-bold mx-2  border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md  hover:text-[#11556E] shadow-md shadow-[#11556E]">
                    <Link to="/register">Register</Link>
                  </div>
                  <div className="text-sm md:text-lg mr-10 text-[#E3F5F3] font-bold mx-2 ml-2 border-2 px-2 py-1 bg-[#1FC8C6] border-[#E3F5F3] rounded-md  hover:text-[#11556E] shadow-md shadow-[#11556E]">
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>
        <div className="h-1 bg-slate-950"></div>
        <main>
          <div className='bg-[url("E:/Codes/All_Project/Report_Rec/Frontend/src/assets/headMed.png")] bg-no-repeat bg-cover bg-[#DDF8F8] h-screen '>
            <div className="flex flex-col items-center">
              <p className="text-[#11556E] font-bold mr-2 mt-24 text-xl lg:text-3xl">
                Welcom to
              </p>
              <div className="text-[#11556E] text-3xl mt-2 font-customFont sm:text-4xl md:text-6xl">
                Medical Report Diagnosis
              </div>
            </div>
            <div className="flex justify-center text-[#11556E] md:text-3xl font-bold mt-10">
              Your Trusted Partner in Understanding Your Health
            </div>
            <div className="flex justify-center mt-10">
              {nameC?(
                <>
              <Link to="/bloodreport"><button className=" border-2 border-[#11556E] rounded-bl-xl rounded-tr-xl ml-3  py-2 px-3 text-xl font-bold text-[#11556E] shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500">
                Check Blood Report
              </button></Link>
                </>
              ):(
                <>
              <Link to="/register"><button className=" border-2 border-[#11556E] rounded-bl-xl rounded-tr-xl ml-3  py-2 px-3 text-xl font-bold text-[#11556E] shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500">
                Check Blood Report
              </button></Link>
                </>
              )}
            </div>
            <div className=" flex justify-center text-center px-4 text-[#11556E] md:text-3xl font-bold mt-12">
              At Medical Report Diagnosis, we believe that your health
              information should be clear, accessible, and empowering. Our
              mission is to help you make sense of your medical reports and
              provide you with detailed, personalized insights into your health.
            </div>
            <div className="mt-72 md:mt-52 lg:mt-48 bg-[#74D8CD] pb-60 ">
              <RevealOnScroll>
                <h3 className=" flex items-center mx-4 font-bold pt-5 py-1 text-2xl text-[#164253] lg:text-4xl lg:pt-16 lg:pb-10">
                  Why Choose{" "}
                  <div className="text-[#11556E] text-lg font-customFont my-4 mx-4 sm:text-xl md:text-4xl">
                    {" "}
                    Medical Health Diagnosis
                  </div>
                </h3>
                <div className=" flex  justify-center ">
                  <div className="border-4 border-[#11556E] rounded-md w-[90%] py-4 mt-2 shadow-xl shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-105  hover:shadow-lg duration-700">
                    <p className=" mx-5 text-sm  lg:text-lg font-semibold">
                      <p className=" list-item list-inside font-bold mb-2 text-[#164253] lg:text-xl">
                        Comprehensive Analysis:
                      </p>
                      We take your medical reports and transform complex data
                      into understandable and actionable information. Our
                      advanced technology and expert team ensure you get a
                      thorough analysis of your health status.
                    </p>
                    <p className=" mx-5 text-sm  lg:text-lg font-semibold">
                      <p className=" list-item list-inside font-bold mt-4 mb-2 text-[#164253] lg:text-xl">
                        Personalized Insights:
                      </p>
                      Your health is unique, and so are our insights. We provide
                      personalized information tailored to your medical history
                      and current health conditions, helping you make informed
                      decisions about your well-being.
                    </p>
                    <p className=" mx-5 text-sm  lg:text-lg font-semibold">
                      <p className=" list-item list-inside font-bold mt-4 mb-2 text-[#164253] lg:text-xl">
                        Secure and Confidentia:
                      </p>
                      We prioritize your privacy. Our platform uses
                      state-of-the-art security measures to ensure your medical
                      information remains confidential and protected.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <h3 className="list-item list-inside mx-4 font-bold pt-5 py-1 text-[#164253] text-2xl lg:text-4xl lg:pt-16 lg:pb-10">
                  How It Works
                </h3>

                <div className="flex  justify-center">
                  <div className="border-4 border-[#11556E] rounded-xl w-[90%] py-4 mt-2 shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-105  hover:shadow-lg duration-700">
                    <p className=" mx-5 text-sm  lg:text-lg font-semibold">
                      <p className=" list-item  list-inside font-bold mt-4 mb-2 lg:text-xl text-[#164253]">
                        Upload Your Reports:
                      </p>
                      Easily upload your medical reports to our secure platform.
                    </p>
                    <p className=" mx-5 text-sm  lg:text-lg font-semibold">
                      <p className=" list-item  list-inside font-bold mt-4 mb-2 text-[#164253] lg:text-xl">
                        Get Detailed Insights:
                      </p>
                      Receive a comprehensive analysis of your report, including
                      explanations of medical terms, risk assessments, and
                      health recommendations.
                    </p>
                    <p className=" mx-5 text-sm lg:text-lg font-semibold">
                      <p className="list-item list-inside font-bold mt-4 mb-2 text-[#164253] lg:text-xl">
                        Stay Informed:
                      </p>
                      Access your personalized health dashboard anytime from your profile.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <h3 className="list-item list-inside mx-4 font-bold pt-5 py-1 text-[#164253] text-2xl lg:text-4xl lg:pt-16 lg:pb-10">
                  Our Services
                </h3>
                <div className="flex  justify-center">
                  <div className="border-4 border-[#11556E] rounded-md w-[90%] py-4 mt-2 shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-105  hover:shadow-lg duration-700">
                    <p className=" mx-5 text-sm lg:text-lg font-semibold">
                      <p className=" list-item  list-inside font-bold mt-4 mb-2 text-[#164253] lg:text-xl">
                        Medical Report Analysis: Expert interpretation of lab:
                      </p>
                      results, imaging reports, and other medical documents.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div className="flex justify-center mt-20 ">
                  <button className="border-4 border-[#11556E] rounded-bl-xl rounded-tr-xl ml-3  py-2 px-4 text-xl font-bold text-[#11556E] shadow-lg shadow-[#11556E] bg-[#1FC8C6] bg-opacity-25 transition ease-in-out delay-100  hover:scale-110 hover:bg-opacity-90 hover:shadow-lg duration-500  ">
                    About Us
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </main>
        <div className="md:mt-[500px] lg:mt-[900px] xl:mt-[1550px] sm:mt-[900px] mt-[1300px] h-1 bg-slate-950"></div>
        <footer>
          <div className="flex flex-col  lg:flex-row lg:justify-evenly text-white bg-slate-800">
            <div className="font-bold mt-4 my-3 mx-4 ">
              Contacut us
              <p className="flex items-center text-sm font-light my-1">
                <img src={email} className="w-[15px] lg:w-[20px] mr-2" alt="Email:" />
                <a href="gmail.com">
                  akhileshpimple3@gmail.com
                </a>
              </p>
              <p className="flex items-center text-sm font-light ">
                <img src={phone} className="w-[15px] lg:w-[20px] mr-2" alt="Phone:" />
                +91 8626059005
              </p>
              <p className="flex items-center text-sm font-light my-1">
                <img src={address} className="w-[15px] lg:w-[20px] mr-2" alt="Address:" />
                Vishwakarma Institute of Technology, Pune
              </p>
            </div>

            <div className="font-bold mt-4 my-3 mx-4 ">
              Social Media
              <p className="flex items-center text-sm font-light my-1">
                <a href="https://www.instagram.com/akhilesh_p_198/" target="_blank">
                  <img
                    src={instagram}
                    className="w-[25px] my-1 mr-2"
                    alt="Instagram"
                  />
                </a>
              </p>
              <p className="flex items-center text-sm font-light my-1">
                <a href="https://www.x.com" target="_blank">
                  <img src={x} className="w-[25px] my-1 mr-2" alt="Twitter" />
                </a>
              </p>
              <p className="flex items-center text-sm font-light my-1">
                <a href="https://www.linkedin.com/in/akhilesh-pimple-8a57b6249/" target="_blank">
                  <img
                    src={linkedin}
                    className="w-[25px] my-1 mr-2"
                    alt="LinkedIn"
                  />
                </a>
              </p>
            </div>
            <div className="font-bold mt-4 my-3 mx-4 ">
              Contributors
              <p className="flex items-center text-sm font-light my-1">
                <img src={boy} className="w-[15px] lg:w-[20px] mr-2" alt="" />
                Akhilesh Pimple {"( "}B.Tech Computer Science and AI
                {" )"}
              </p>
              <p className="flex items-center text-sm font-light my-1">
                <img src={girl} className="w-[15px] lg:w-[20px] mr-2" alt="" />
                Ashwanti Gaikwad {"( "}B.Tech Artifical Intelligence and AI
                {" )"}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Main;
