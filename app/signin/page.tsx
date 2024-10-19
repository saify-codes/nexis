'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function () {

    const auth = useSession()

    console.log(auth.status);

    
    const foo = () => {
        signIn('credentials',{
            email: 'anas@gmail.com',
            password: 'password',
            redirect: false,
        })
    }   
    const foo2 = () => {
        signOut({redirect:false})
    }   

    return <>

        <input type="text" className="border-red-500 border"/>
        <input type="text" className="border-red-500 broder"/>

        <button onClick={foo} className=" text-blue-500">login</button>
        <button onClick={foo2}>logout</button>

    </>
}