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

  async deleteUsers(ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new ApiError("Invalid request. Provide an array of user IDs.");
    }

    const result = await UserTableModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      throw new ApiError("No users found for the provided IDs.");
    }

    return { message: `${result.deletedCount} users deleted successfully` };
  }
}

module.exports = new userTableService()