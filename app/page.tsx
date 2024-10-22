'use client'
import { useDispatch } from "react-redux";
import { destroySession } from "@/store/auth";
import { Auth } from "@/lib/firebase";
import React from 'react'
import Layout from "@/layouts/app";

export default function () {

  const dispatch = useDispatch()
  const signOut = async () =>{
    await Auth.logout()
    dispatch(destroySession())
  }

  return <Layout>
    <button onClick={signOut}>logout</button>
  </Layout>
}
