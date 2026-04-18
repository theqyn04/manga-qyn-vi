const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  static signToken(id, role) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    const token = AuthService.signToken(user._id, user.role);
    return { token, user: { id: user._id, username: user.username, role: user.role } };
  }
}

module.exports = new AuthService();