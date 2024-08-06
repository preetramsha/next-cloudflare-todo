'use client';

export const validateToken = async () => {
    let resp = await fetch(`http://localhost:8787/api/validatetoken`,{
      cache:'default',
      method:'GET',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    resp = await resp.json();
    return resp
}

export const logout = async () => {
  let resp = await fetch(`http://localhost:8787/api/logout`,{
    cache:'default',
    method:'POST',
    credentials:'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  resp = await resp.json();
  return resp;
}