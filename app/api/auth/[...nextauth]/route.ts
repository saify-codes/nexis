import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {

                return null
            }
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }