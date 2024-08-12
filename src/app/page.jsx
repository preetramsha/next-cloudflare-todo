'use client';
export const runtime = 'edge';
import * as React from "react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.location.replace('/login')
  }, [])
  
}