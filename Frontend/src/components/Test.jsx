import React, { useContext } from 'react';
import { userNameContext, userAgeContext, userEmailContext, userGenderContext } from "../context/context";

const Test = () => {
  const { nameC } = useContext(userNameContext);
  const { ageC } = useContext(userAgeContext);
  const { genderC } = useContext(userGenderContext);
  const { emailC } = useContext(userEmailContext);

  return (
    <div>
      <p>Name = {nameC}</p>
      <p>Email = {emailC}</p>
      <p>Gender = {genderC}</p>
      <p>Age = {ageC}</p>
    </div>
  );
};

export default Test;
