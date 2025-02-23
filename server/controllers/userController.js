const userService = require('../service/userService')

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body
      const userData = await userService.registration(name, email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const user = await userService.updateUserRole(userId, role);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      return res.json({ message: "Роль успешно обновлена", user });
    } catch (e) {
      console.error("Ошибка сервера при обновлении роли:", e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }


  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { name, email, role } = req.body;

      const user = await userService.updateUser(userId, { name, email, role });

      res.json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
  }

  async updateUserBanStatus(req, res) {
  try {
    const { userId } = req.params;
    const { banned } = req.body;

    const user = await userService.updateUserBanStatus(userId, banned);
    res.json({ message: `User ${banned ? "banned" : "unbanned"} successfully`, user });
  } catch (error) {
    console.error("Error updating ban status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

}

module.exports = new UserController()