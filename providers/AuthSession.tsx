'use client'

import { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth, DB } from '@/lib/firebase'
import { setSession, destroySession } from '@/store/auth'

export default function ({ children }: { children: React.ReactNode }) {

    const { push } = useRouter();
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        Auth.authenticated()
            .then(async session => {
                if (session) {
                    const user = await DB.getData('users', session.uid)

                    if (user) {
                        console.log(user);
                        
                        return dispatch(setSession({
                            status: 'authenticated',
                            token: await session.getIdToken(),
                            user: { ...user, created: user?.created.toDate().toISOString() }
                        }))

                    }

                }

                document.cookie = "auth-token=; max-age=-1" // delete cookie
                dispatch(destroySession())
            })
    }, [])

    useEffect(() => {
        switch (auth.status) {
            case 'authenticated':
                push('/')
                break;
            case 'unauthenticated':
                push('/signin')
                break;

        }
    }, [auth])

    return auth.status === 'loading'? 'Loading...' : children
}
