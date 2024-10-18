import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeApp, type FirebaseApp, } from "firebase/app";

export default class Init {

    protected static app: FirebaseApp
    protected static db:  Firestore  

    static init() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app)
    }
}