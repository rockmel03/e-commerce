

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteProductsDatabaseId: String(import.meta.env.VITE_APPWRITE_PRODUCTS_DATABASE_ID),
    appwriteProductsCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID),
    appwriteProductsImagesStorageId: String(import.meta.env.VITE_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID),
}

export default conf