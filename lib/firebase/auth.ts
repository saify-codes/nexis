import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signOut,
    type User
} from "firebase/auth";
import { DB } from "./db";


type authResponse = {
    error: string | null
    user: Record<string, any> | null
    token: string | null
}

type authUser = {
    error: string | null
    user: Record<string, any> | null
}

export class Auth {

    static async createUser(email: string, password: string) {
        const response: authUser = { error: null, user: null }
        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            response.user = userCredential.user

        } catch (error: any) {
            console.error("Error creating user:", error.code, error.message);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    response.error = 'email already exists'
                    break;
                default:
                    response.error = 'something went wrong'

            }

        } finally {
            return response
        }
    }

    static authenticated() {

        return new Promise<User | null>(res => {
            onAuthStateChanged(getAuth(), user => {
                res(user)
            })
        })
    }

    static async login(email: string, password: string, remember: boolean) {
        const response: authResponse = { error: null, user: null, token: null }
        const auth = getAuth();
        const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence); // Set persistence based on the remember me checkbox

        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            const user = await DB.getData('users', credentials.user.uid)
            response.token = await credentials.user.getIdToken()
            response.user = { ...user, created: user?.created.toDate().toISOString() }

        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-email':
                    response.error = 'Invalid email'
                    break;
                case 'auth/invalid-credential':
                    response.error = 'Invalid credentials'
                    break;
                case 'auth/too-many-requests':
                    response.error = 'Too many attempts account temporary blocked'
                    break;
            }
        } finally {
            return response
        }
    }

    static async logout() {
        const auth = getAuth();
        try {
            await signOut(auth);
            return true;
        } catch (error: any) {
            console.error("Error signing out:", error.code, error.message);
            return false;
        }
    }

}