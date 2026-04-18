const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const newUser = await authService.createUser(req.body);
    const token = authService.constructor.signToken(newUser._id, newUser.role);

    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  } catch (err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field === 'email' ? 'Email' : 'Username'} này đã được sử dụng. Vui lòng chọn cái khác.`
    });
  }
  
  res.status(500).json({ success: false, message: err.message });
}
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).json({ status: 'success', ...result });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: `Admin đã xóa thành công user có ID: ${req.params.id}`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};