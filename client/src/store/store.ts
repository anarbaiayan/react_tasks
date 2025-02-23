import { IUser } from "../models/IUser";
import { makeAutoObservable } from 'mobx'
import AuthService from "../services/AuthService.ts";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http/index.ts";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      return response.data.user.role;
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      const response = await AuthService.registration(name, email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      return response.data.user.role;
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      return;
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
}