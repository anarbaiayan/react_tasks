import $api from '../http/index.ts'

export default class UserTableService {
  static fetchUsers() {
    return $api.get('/userTable');
  }

  static addUser(name: string, email: string) {
    return $api.post('/userTable', { name, email });
  }

  static updateUser(id: string, name: string, email: string) {
    return $api.put(`userTable/${id}`, { name, email });
  }
  

  static deleteUser(id: string) {
    return $api.delete(`/userTable/${id}`);
  }

}
