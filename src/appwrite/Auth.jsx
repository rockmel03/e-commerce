import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("auth::creteAccount::Error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("auth::login::Error", error);
      throw Error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("auth::getCurrentUser::Error", error);
    }
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      console.log("auth::logout::Error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
