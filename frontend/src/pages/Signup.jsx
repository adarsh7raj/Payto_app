import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  // const handleSignup = () => {
  //   axios.post("http://localhost:3000/api/v1/user/signup", {
  //     username: username,
  //     firstname: firstName,
  //     lastname: lastName,
  //     password: password
  //   }).then(response => {
  //     console.log(response.data);
  //   }).catch(error => {
  //     console.error("There was an error signing up!", error);
  //   });
  

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox 
            onChange={(e) => setFirstName(e.target.value)} // Use oninput prop
            placeholder="First Name" 
            label={"First Name"} 
          />
          <InputBox 
            onChange={(e) => setLastName(e.target.value)} // Use oninput prop
            placeholder="Last Name" 
            label={"Last Name"} 
          />
          <InputBox 
            onChange={(e) => setUsername(e.target.value)} // Use oninput prop
            placeholder="abc@gmail.com" 
            label={"Email"} 
          />
          <InputBox 
            onChange={(e) => setPassword(e.target.value)} // Use oninput prop
            placeholder="Password" 
            label={"Password"} 
          />
          <div className="pt-4">
          <Button onClick={()=>{axios.post("https://payto-app-1.onrender.com/api/v1/user/signup",{
            username:userName,
            firstname:firstName,
            lastname:lastName,
            password:password
          }).then(function(response){
            console.log(response.data);
          })}}
          label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>)
}

