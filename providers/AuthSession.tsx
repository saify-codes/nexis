'use client'

import dynamic from 'next/dynamic'
import { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth, DB } from '@/lib/firebase'
import { setSession, destroySession } from '@/store/auth'

const Loader = dynamic(() => import('@/components/loaders/cat'), {
    ssr: false, // Ensures it only renders on the client-side
});

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
                        return dispatch(setSession({
                            status: 'authenticated',
                            token: await session.getIdToken(),
                            user: { ...user, created: user?.created.toDate().toISOString() }
                        }))

                    }
                }

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

    return auth.status === 'loading' ? <Loader /> : children
}
