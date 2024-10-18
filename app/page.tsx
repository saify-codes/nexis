'use client'

import Init from '@/lib/firebase'
import { DB } from '@/lib/firebase/db'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function () {


  function foo(){
    signOut()
  }

  return <button onClick={foo}>logout</button>
}
