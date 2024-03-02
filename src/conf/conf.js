const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionOrder: String(import.meta.env.VITE_APPWRITE_COLLECTION_Order),
    appwriteCollectionDetail: String(import.meta.env.VITE_APPWRITE_COLLECTION_Detail),
    appwriteCollectionCart: String(import.meta.env.VITE_APPWRITE_COLLECTION_Cart),
    appwriteCollectionAdress: String(import.meta.env.VITE_APPWRITE_COLLECTION_Adress),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;