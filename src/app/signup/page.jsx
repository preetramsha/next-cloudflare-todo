'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Register, checkusername } from "@/lib/utils";

export default function page() {
  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
  });

    return (
<div class="h-screen flex items-center justify-center">

<div class="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
  
  <h2 class="text-3xl text-gray-400 mb-3">Sign Up</h2>
  
  <div class="mb-2">
    <div className="flex justify-between">
    <label class="text-sm">Username</label>
        <div>
        <div className="text-green-600 flex items-center hidden">Available&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
        <div className="text-red-600 flex items-center hidden">Unavailable&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </div>
        </div>
    </div>
    <input type="text" placeholder="johndoe" onChange={(e)=>{setUserdata((prevData)=>({...prevData,username:e.target.value}))}} class="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none" />
  </div>
  
  <div class="mt-2 mb-3">
    <label class="text-sm">Password</label>
    <input type="password" placeholder="Pa$$w0rd" onChange={(e)=>{setUserdata((prevData)=>({...prevData,password:e.target.value}))}} class="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"/>
  </div>
  
  <button 
          class="border-none bg-blue-800 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5" 
          type="submit"
          onClick={()=> Register(userdata)}
          >
    Create Account
  </button>
  
  <Link href="/login" class="text-sm text-blue-400">Login?</Link>
  
  
</div>

</div>
    );
}
