const {
  signUpController,
  getVerificationCodeController,
  setNewPasswordController,
  loginController,
  dupliCheckController,
} = require('./userController');
const {
  createThreadController,
  viewThreadController,
  updateThreadController,
  deleteThreadController,

} = require('./threadController');

module.exports = {
  userController: {
    signUpController,
    getVerificationCodeController,
    setNewPasswordController,
    loginController,
    dupliCheckController,
  },
  threadController: {
    createThreadController,
    viewThreadController,
    updateThreadController,
    deleteThreadController,
  },
};
