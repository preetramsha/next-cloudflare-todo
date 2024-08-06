'use client';

import Link from 'next/link';
import React, { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
export default function test() {
  const cookie = new Cookies();
  const [token, setToken] = useState('')
  const [resp, setResp] = useState('')
     const validateToken = async () => {
        let resp = await fetch(`http://localhost:8787/api/validatetoken`,{
          cache:'default',
          method:'GET',
          credentials:'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        return await resp.json();
      }
      useEffect(() => {
        validateToken().then(r => setResp(r.data.username))
        setToken(cookie.get('token',{doNotParse:true}));
      }, [])
      
    return (
        <div>
          <div>Here is fetched token</div>

            <p>{resp}</p>
            <br />
            rich nigga shit I do a lotta
            <br />
            <Link href={'/test2'}>Go to test 2</Link>
            <br />
            <Link href={'/'}>Home</Link>
        </div>
    );
}