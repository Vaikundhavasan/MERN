import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  
  const validateUser = () => {

    if (!userName) {
      setCustomError1(
        <p className="text-red-500 text-sm ">field can't empty</p>
      );
      return false;
    } else {
      setCustomError1("");
      return true;
    }
  };

  const validatePass = () => {
    
    if (!password) {
      setCustomError2(
        <p className="text-red-500 text-sm ">field can't empty</p>
      );
      return false;
    } else {
      setCustomError2("");
      return true;
    }

  };

  const validateConfirmPass = () =>{
    if (!confirmPassword) {
      setCustomError3(
        <p className="text-red-500 text-sm ">Field Can't Empty</p>
      );
      return false;
    }


    if (password !== confirmPassword) {
      setCustomError3(
        <p className="text-red-500 text-sm ">Password Not Match</p>
      );
      return false;
    } else {
      setCustomError3("");
      return true;
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    validateUser();
    validatePass();
    validateConfirmPass();
    if (validateUser() && validatePass() && validateConfirmPass())
    {
      axios.post("http://localhost:2000/api/user",{
        userName,password
      }).then(()=> alert("Success") ).catch( ()=> alert("failed") )
    }
  };



  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [customError1, setCustomError1] = useState("");
  const [customError2, setCustomError2] = useState("");
  const [customError3, setCustomError3] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen text-2xl">
      <form className="flex flex-col gap-10  " onSubmit={submitForm}>
        <div className="[&>input]:p-5 [&>input]:border-2">
          <input
            type="text"
            placeholder="UserName/Email"
            onChange={(e) => setUserName(e.target.value)}
          />
          {customError1}
        </div>
        <div className="[&>input]:p-5 [&>input]:border-2">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {customError2}
        </div>
        <div className="[&>input]:p-5 [&>input]:border-2">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {customError3}
        </div>
        <button type="submit" className="bg-red-300 p-5 ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
