import {
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    writeBatch,
    limit,
    QuerySnapshot,
    type WhereFilterOp,
    collection as firestoreCollection
} from 'firebase/firestore';

import Base from ".";

export class DB extends Base {

    static async addData(collection: string, data: Record<string, any>) {

        this.verifyFirebaseInitialization()

        try {
            const docRef = await addDoc(firestoreCollection(this.db, 'users'), data);
            return docRef.id;
        } catch (e) {
            console.error('Error adding document to collection', collection, e);
            return null
        }
    }

    static async setData(collection: string, id: string, data: Record<string, any>) {

        this.verifyFirebaseInitialization()

        try {
            await setDoc(doc(this.db, collection, id), data);
            return true;

        } catch (e) {
            console.error('Error setting document to collection', collection, e);
            return false
        }
    }

    static async updateData(collection: string, id: string, data: Record<string, any>) {

        this.verifyFirebaseInitialization()

        const userRef = doc(this.db, collection, id);
        try {
            await updateDoc(userRef, data);
            return true
        } catch (e) {
            console.error('Error updating document to collection', collection, e);
            return false
        }
    }

    static async deleteData(collection: string, id: string) {

        this.verifyFirebaseInitialization()

        await deleteDoc(doc(this.db, collection, id));
        return true
    }

    static async getData(collection: string, id: string) {
        const docRef = doc(this.db, collection, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    static async getAllData(collection: string) {

        this.verifyFirebaseInitialization()

        const data: any[] = []
        const querySnapshot = await getDocs(firestoreCollection(this.db, collection));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        return data;
    }

    static async query(collection: string, field: string, operator: WhereFilterOp, value: any) {

        this.verifyFirebaseInitialization()

        const data: any[] = []
        const q = query(firestoreCollection(this.db, collection), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        return data
    }

    static async deleteCollection(collectionPath: string) {

        this.verifyFirebaseInitialization()

        const collectionRef = firestoreCollection(this.db, collectionPath);
        const batchSize = 500;
        let querySnapshot: QuerySnapshot;

        try {
            do {
                const q = query(collectionRef, limit(batchSize));
                querySnapshot = await getDocs(q);

                if (querySnapshot.size === 0) {
                    break;
                }

                const batch = writeBatch(this.db);
                querySnapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
            } while (querySnapshot.size >= batchSize);

            return true;
        } catch (e) {
            console.error('Error deleting collection', collectionPath, e);
            return false;
        }
    }
}