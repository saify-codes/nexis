'use client'
import { useDispatch } from "react-redux";
import { destroySession } from "@/store/auth";


import React from 'react'
import { Auth } from "@/lib/firebase";

export default function () {

  const dispatch = useDispatch()
  const foo = async () =>{
    await Auth.logout()
    dispatch(destroySession())
  }

  return <button onClick={foo}>logout</button>
}
