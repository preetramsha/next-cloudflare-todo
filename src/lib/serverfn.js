'use server';

import { redirect } from 'next/navigation';

export const Register = async (usrdata) => {
  let resp = await fetch(`http://localhost:8787/api/user`,{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usrdata),
  })
  return (await resp.json());
}

export const customredirect = async (url)=>{
  redirect(url)
}

export const checkusername = async (username) => {
  let resp = await fetch(`http://localhost:8787}/api/isusernameavailable?username=${username}`,{
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  resp = await resp.json();
  return JSON.stringify(resp)
}