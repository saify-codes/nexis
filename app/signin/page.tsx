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

        <input type="text" />
        <input type="text" />

        <button onClick={foo}>kk</button>
        <button onClick={foo2}>logout</button>

    </>
}