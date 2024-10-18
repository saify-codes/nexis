'use client'

import Init from '@/lib/firebase'
import { DB } from '@/lib/firebase/db'
import React from 'react'

export default function () {

  function foo(){
    DB.addData('users',{name: "foo"})
  }

  return <button onClick={foo}>set user</button>
}
