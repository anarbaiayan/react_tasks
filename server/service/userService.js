const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exeptions/apiError')

class UserService {
  async registration(name, email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3)

    const user = await UserModel.create({ name, email, password: hashPassword })

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('There is no user with this email')
    }
    if (user.banned) {
      throw ApiError.BadRequest('Banned')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw ApiError.BadRequest('Invalid password')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.BadRequest('no token')
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!tokenFromDb) {
      throw ApiError.BadRequest('no token in db')
    }

    if (!userData) {
      throw ApiError.BadRequest('not valid refresh token')
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async getAllUsers() {
    const users = await UserModel.find()
    return users
  }

  async updateUserRole(userId, role) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    user.role = role;
    await user.save();

    return user;
  }

  async updateUser(userId, { name, email, role }) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();

    return user;
  }

  async updateUserBanStatus(userId, banned) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    user.banned = banned;
    await user.save();

    return user;
  }


}

module.exports = new UserService()