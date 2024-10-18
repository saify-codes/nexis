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

export class Auth{

    static async createUser(email: string, password: string) {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created successfully:", user);
            return user;
        } catch (error: any) {
            console.error("Error creating user:", error.code, error.message);
            throw error;
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
        const auth = getAuth();
        const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence); // Set persistence based on the remember me checkbox
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
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