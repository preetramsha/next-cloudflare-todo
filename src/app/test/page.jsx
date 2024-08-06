'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
export default function test() {
  
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
        validateToken().then(r => console.log(r))
      }, [])
      
    return (
        <div>
            <div>{}</div>
            <br />
            rich nigga shit I do a lotta
            <Link href={'/test2'}>Go to test 2</Link>
            
            <Link href={'/'}>Home</Link>
        </div>
    );
}