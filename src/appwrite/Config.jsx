// create services like
// create, deleate , update , getsingle, getmultiple, query

import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createProduct({ image, title, description, price, category, seller }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteProductsDatabaseId,
        conf.appwriteProductsCollectionId,
        ID.unique(),
        { image, title, description, price, category, seller }
      );
    } catch (error) {
      console.log("Services:: createProduct :: Error", error);
    }
  }

  async updateProduct({ id, ...data }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteProductsDatabaseId,
        conf.appwriteProductsCollectionId,
        id,
        data //{ image, title, description, price, category, seller }
      );
    } catch (error) {
      console.log("Services:: updateProduct :: Error", error);
    }
  }

  async deleteProduct(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteProductsDatabaseId,
        conf.appwriteProductsCollectionId,
        slug
      );
    } catch (error) {
      throw Error(error);
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteProductsImagesBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw Error(error);
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteProductsImagesBucketId,
        fileId
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async getProducts(query) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteProductsDatabaseId,
        conf.appwriteProductsCollectionId,
        query ? query : undefined
      );
    } catch (error) {
      throw Error(error);
    }
  }
  async getImagePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appwriteProductsImagesBucketId,
        fileId
      );
    } catch (error) {
      throw Error(error);
    }
  }
}

const appwriteService = new Service();

export default appwriteService;
