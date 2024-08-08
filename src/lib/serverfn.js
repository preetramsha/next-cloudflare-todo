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
  let resp = await fetch(`http://localhost:8787/api/isusernameavailable?username=${username}`,{
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  resp = await resp.json();
  return resp
}

export const posttodo = async(username,desc,token) => {
  let resp = await fetch(`http://localhost:8787/api/todo`,{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({username,desc}),
  })
  resp = await resp.json();
  return resp
}

export const deletetodo = async(username,tid,token) => {
  let resp = await fetch(`http://localhost:8787/api/todo`,{
    method:'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({username,tid}),
  })
  resp = await resp.json();
  return resp
}
export const patchtodo = async(username,desc,tid,token) => {
  let resp = await fetch(`http://localhost:8787/api/todo`,{
    method:'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({username,desc,tid}),
  })
  resp = await resp.json();
  return resp
}

export const gettodo = async(username,token) => {
  let resp = await fetch(`http://localhost:8787/api/todo?username=${username}`,{
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  console.log('saf3',resp)
  resp = await resp.json();
  return resp
}

export const toggletodo = async(username,tid,token) => {
  let resp = await fetch(`http://localhost:8787/api/todo/status`,{
    method:'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({username,tid}),
  });
  console.log('from toggle'+resp)
  resp = await resp.json();
  return resp
}