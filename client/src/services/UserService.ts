import $api from '../http/index.ts'
import { AxiosResponse } from 'axios'
import { IUser } from '../models/IUser'

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }

  static async updateUserRole(userId: string, role: string) {
    return $api.put(`/users/${userId}/role`, { role });
  }

  static async getUserProfile() {
    return $api.get(`/user/profile`);
  }

  static async updateUserProfile(userId: string, userData: { name: string; email: string }) {
    return $api.put(`/user/profile/${userId}`, userData);
  }

  static async updateUser(userId: string, userData: { name: string; email: string; role: string }) {
    return $api.put(`/users/${userId}`, userData);
  }

  static async updateUserBanStatus(userId: string, banned: boolean) {
    return $api.put(`/users/${userId}/ban`, { banned });
  }

}
