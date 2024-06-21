import Register from "./components/Register";
import Main from "./components/Main";
import Test from "./components/Test";
import Login from "./components/Login";
import BloodReport from "./components/BloodReport";
import Profile from "./components/Profile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  userNameContext,
  userAgeContext,
  userEmailContext,
  userGenderContext,
  userPasswordContext,
  userIdContext,
} from "./context/context";

function App() {
  const [nameC, setNameC] = useState(
    () => localStorage.getItem("userName") || ""
  );
  const [emailC, setEmailC] = useState(
    () => localStorage.getItem("userEmail") || ""
  );
  const [genderC, setGenderC] = useState(
    () => localStorage.getItem("userGender") || ""
  );
  const [ageC, setAgeC] = useState(
    () => parseInt(localStorage.getItem("userAge")) || 0
  );
  const [passC, setPassC] = useState(
    () => localStorage.getItem("userPass") || ""
  );
  const [idC, setIdC] = useState(() => localStorage.getItem("userId") || -1);

  useEffect(() => {
    localStorage.setItem("userName", nameC);
  }, [nameC]);

  useEffect(() => {
    localStorage.setItem("userEmail", emailC);
  }, [emailC]);

  useEffect(() => {
    localStorage.setItem("userGender", genderC);
  }, [genderC]);

  useEffect(() => {
    localStorage.setItem("userAge", ageC);
  }, [ageC]);

  useEffect(() => {
    localStorage.setItem("userPass", passC);
  });

  useEffect(() => {
    localStorage.setItem("userId", idC);
  });

  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/register", element: <Register /> },
    { path: "/about", element: <Register /> },
    { path: "/test", element: <Test /> },
    { path: "/login", element: <Login /> },
    { path: "/bloodreport", element: <BloodReport /> },
    { path: "/profile", element: <Profile /> },
  ]);

  return (
    <userIdContext.Provider value={{ idC, setIdC }}>
      <userPasswordContext.Provider value={{ passC, setPassC }}>
        <userEmailContext.Provider value={{ emailC, setEmailC }}>
          <userGenderContext.Provider value={{ genderC, setGenderC }}>
            <userAgeContext.Provider value={{ ageC, setAgeC }}>
              <userNameContext.Provider value={{ nameC, setNameC }}>
                <RouterProvider router={router} />
              </userNameContext.Provider>
            </userAgeContext.Provider>
          </userGenderContext.Provider>
        </userEmailContext.Provider>
      </userPasswordContext.Provider>
    </userIdContext.Provider>
  );
}

export default App;
