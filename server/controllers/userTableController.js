const userTableService = require('../service/userTableService')

class userTableController {
  async getUsers(req, res, next) {
    try {
      const users = await userTableService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async addUser(req, res, next) {
    try {
      const { name, email } = req.body
      const userData = await userTableService.addUser(name, email)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userTableService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (e) {
      next(e)
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await userTableService.updateUser(req.params.id, name, email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }


  async deleteUser(req, res) {
    try {
      const user = await userTableService.deleteUser(req.params.id);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }


};

module.exports = new userTableController();