import conf from '../conf/conf.js';

// import { Client, Account, ID, Databases, Query } from "appwrite";


import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createList({title, description, keyword, status, brand, model, use, material, width, height, weight, userid, price, image}){
        // console.log("title", title, "description", description, "keyword", keyword, "status", status, "brand", brand, "model", model, "use", use, "material", material, "width", width, "height", height, "weight", weight, "userid", userid, "userid", userid, "image", image)
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionDetail,
                slug,
                {
                    title,
                    description,
                    keyword,
                    status,
                    brand,
                    model,
                    use,
                    material,
                    width,
                    height,
                    weight,
                    userid,
                    price,
                    image,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updateList(slug, {title, description, keyword, status, brand, model, use, material, width, height, weight, userid, price, image}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionDetail,
                slug,
                {
                    title,
                    description,
                    keyword,
                    status,
                    brand,
                    model,
                    use,
                    material,
                    width,
                    height,
                    weight,
                    userid,
                    price,
                    image,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deleteList(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionDetail,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getList(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionDetail,
                slug,
            )
        } catch (error) {
            console.log("Appwrite serive :: getList :: error", error);
            return false
        }
    }

    async getLists(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionDetail,
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async createCart({title, brand, userid, price, image, quantity, description}){
        // console.log("title", title, "brand", brand, "price", price, "image", image, "quantity", quantity)
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(-15) + userid;
        // console.log(slug);
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCart,
                slug,
                {
                    title,
                    brand,
                    userid,
                    price,
                    image,
                    quantity,
                    description,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createCart :: error", error);
        }
    }

    async updateCart({userid, title, quantity}){
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(-15) + userid;
        // console.log(slug);
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCart,
                slug,
                {
                    quantity,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateCart :: error", error);
        }
    }

    async getCarts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCart,
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async getCart({userid, title}){
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(-15) + userid;
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCart,
                slug,
            )
        } catch (error) {
            console.log("Appwrite serive :: getList :: error", error);
            return false
        }
    }

    async deleteCart({title, userid}){
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(-15) + userid;
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCart,
                slug,
            )
        } catch (error) {
            console.log("Appwrite serive :: deleteCart :: error", error);
        }
    }
    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileid){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

    async createadress({ name, company, phone, adress1, adress2, city, zip, country, state, userid}){
        console.log(name, company, phone, adress1, adress2, city, zip, country, state, userid)
        const slug = ID.unique()
        console.log(slug);
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionAdress,
                slug,
                {
                    name,
                    company,
                    phone,
                    adress1,
                    adress2,
                    city,
                    zip,
                    country,
                    state,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createadress :: error", error);
        }
    }

    async updateadress(slug, { name, company, adress1, adress2, phone, city, zip, country, state, userid}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionAdress,
                slug,
                {
                    name,
                    company,
                    adress1,
                    adress2,
                    phone,
                    city,
                    zip,
                    country,
                    state,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async getadress(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionAdress,
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async deleteadress(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionAdress,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async createOrder({title, userid, price, image, ownerid, location}){
        // console.log("title", title, "description", description, "keyword", keyword, "status", status, "brand", brand, "model", model, "use", use, "material", material, "width", width, "height", height, "weight", weight, "userid", userid, "userid", userid, "image", image)
        const slug = title.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(-15) + userid;
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionOrder,
                slug,
                {
                    title,
                    userid,
                    price,
                    image,
                    ownerid,
                    location,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

}


const service = new Service()
export default service