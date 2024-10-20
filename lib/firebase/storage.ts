import {
    StorageReference,
    UploadResult,
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
} from 'firebase/storage';
import Base from '.';

export class Storage extends Base {

    private static createStorage(folder: string, userId: string, fileName?: string): StorageReference {
        const path = fileName ? `${folder}/${userId}/${fileName}` : `${folder}/${userId}`;
        return ref(this.storage, path);
    }

    static async uploadFile(folder: string, userId: string, file: File): Promise<UploadResult> {
        const storageRef = this.createStorage(folder, userId, file.name);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log('Uploaded a file!', snapshot);
            return snapshot;
        } catch (error) {
            console.error('Upload failed', error);
            throw error;
        }
    }

    static async listFiles(folder: string, userId: string): Promise<StorageReference[]> {
        const storageRef = this.createStorage(folder, userId);

        try {
            const listResult = await listAll(storageRef);
            return listResult.items; // Returns an array of StorageReference objects
        } catch (error) {
            console.error('Failed to list files', error);
            throw error;
        }
    }

    static async getFileURL(folder: string, userId: string, fileName: string): Promise<string> {
        const storageRef = this.createStorage(folder, userId, fileName);

        try {
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error('Failed to get file URL', error);
            throw error;
        }
    }

    static async listFileURLs(folder: string, userId: string): Promise<{ name: string; url: string }[]> {
        const storageRef = this.createStorage(folder, userId);

        try {
            const listResult = await listAll(storageRef);
            const files = await Promise.all(
                listResult.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return { name: itemRef.name, url };
                })
            );
            return files;
        } catch (error) {
            console.error('Failed to list file URLs', error);
            throw error;
        }
    }
}
