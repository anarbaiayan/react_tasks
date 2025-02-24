const UserTableModel = require('../models/UserTable')
const ApiError = require('../exeptions/apiError')

class userTableService {
  async getAllUsers() {
    const users = await UserTableModel.find()
    return users
  }

  async getUserById(userId) {
    return await UserTableModel.findById(userId);
  }

  async addUser(name, email) {
    const existingUser = await UserTableModel.findOne({ email });
    if (existingUser) {
      throw new ApiError("User with this email already exists");
    }
    const newUser = new UserTableModel({ name, email });
    return await newUser.save();
  }

  async updateUser(userId, name, email) {
    return await UserTableModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
  }

  async deleteUser(id) {
    const deletedUser = await UserTableModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = new userTableService()