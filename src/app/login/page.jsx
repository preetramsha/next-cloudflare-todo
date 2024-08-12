'use client';

export const runtime = 'edge';
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customredirect } from '@/lib/serverfn';
import { validateToken } from '@/lib/auth';
import Image from 'next/image';
export default function Page() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    validateToken().then(
      (res) => {
        console.log('q res',res);
        if(res.ok){
          toast.warn("Already logged in")
          customredirect('/todos');
        }
        else{
          setLoading(false);
        }
      }
    )
  }, [])
  
   const Login = async (usrdata) => {
    let resp = await fetch(`https://todo-cf.preetramsha.workers.dev/api/login`,{
      credentials:'include',
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usrdata),
    })
    resp = await resp.json();
    console.log(resp)
    if(resp.ok) {
      toast.success("Logged in!");
      setTimeout(() => {
        customredirect('/todos')
      }, 700);
    }
    else{
      toast.error("Invalid credentials");
    }
    return resp;
  }
  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
  });
  if (loading) {
    return(
      <div className="flex h-screen justify-center items-center">
      <Image
        src="/loading.gif"
        alt="Loading..."
        className="dark:invert"
        width={50}
        height={24}
        priority
      />
  </div>
    )
  }else{
  return (
<div class="h-screen flex items-center justify-center bg-green-300">
<ToastContainer/>
<div class="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
  
  <h2 class="text-3xl text-gray-400 mb-3">Login</h2>
  
  <div class="mb-2">
    <label class="text-sm">Username</label>
    <input type="text" placeholder="johndoe" onChange={(e)=>{setUserdata(prevData => ({...prevData,username:e.target.value}))}} class="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none" />
  </div>
  
  <div class="mt-2 mb-3">
    <label class="text-sm">Password</label>
    <input type="password" placeholder="Pa$$w0rd" onChange={e => {setUserdata(prevData => ({...prevData,password:e.target.value}))}} class="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"/>
  </div>
  
  <button 
          class="border-none bg-blue-800 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5" 
          type="submit"
          onClick={async ()=> Login(userdata).then((r)=> console.log(r))}
          >
    Sign In
  </button>
  
  <Link href="/signup" class="text-sm text-blue-400">Create New Account</Link>
  
</div>

</div>
  )}
}


// export async function getServerSideProps(ctx){


//     return {
//         props:{
//             data:null
//         }
//     }
// }