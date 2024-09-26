import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import axios from "axios";
export const Balance = function(){
    const [balance,setbalance]=useState();
useEffect(function(){
    try{
        const value=axios.get("http://localhost:3000/api/v1/account/balance",{headers:{  'Authorization':localStorage.getItem("token")}});
        value.then(function(amount){
            console.log(amount.data.balance);
            setbalance(amount.data.balance);
        })
    }
    catch(e){
       console.log(e);
    }

},[]);
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Balance</h1>
            <p className="text-6xl font-semibold text-green-500 mb-6">
              ${balance}
            </p>
            <p className="text-gray-600">This is your current balance.</p>
          </div>
        </div>
      );
}