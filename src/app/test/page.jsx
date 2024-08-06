'use client';
import Link from 'next/link';
import React from 'react';
export default function test() {
     const validateToken = async () => {
        let resp = await fetch(`http://localhost:8787/api/validatetoken`,{
          method:'GET',
          credentials:'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        resp = await resp.json();
        console.log(resp);
        return JSON.stringify(resp)
      }
    return (
        <div>
            <div onClick={validateToken}>Click to check token</div>
            rich nigga shit I do a lotta
            <Link href={'/test2'}>Go to test 2</Link>
            
            <Link href={'/'}>Home</Link>
        </div>
    );
}