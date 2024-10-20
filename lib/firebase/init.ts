import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeApp, type FirebaseApp, } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

export default class {

    protected static app: FirebaseApp
    protected static db: Firestore
    protected static storage: FirebaseStorage
    private static isInitialized = false

    static init() {
        this.app     = initializeApp(firebaseConfig);
        this.db      = getFirestore(this.app)
        this.storage = getStorage(this.app)
        this.isInitialized = true

    }

    static verifyFirebaseInitialization() {
        if (!this.isInitialized) throw Error('Firebase not initialized')
    }
}