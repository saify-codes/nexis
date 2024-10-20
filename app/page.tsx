'use client'
import { useDispatch } from "react-redux";
import { destroySession } from "@/store/auth";


import React from 'react'

export default function () {

  const dispatch = useDispatch()
  const foo = () =>{
    dispatch(destroySession())
  }

  return <button onClick={foo}>logout</button>
}
