const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/refresh_token', userController.refreshToken);
router.get('/info', auth, userController.getUser);
router.get('/all', auth, authAdmin, userController.getAllUser);
router.patch('/addcart', auth, userController.addCart);
router.get('/history', auth, userController.history);
router.patch('/updateUserInfo', auth, userController.updateUserInfo);
router.patch('/changePassword', auth, userController.changePassword);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', auth, userController.resetPassword);
router.delete('/delete/:id', auth, authAdmin, userController.deleteUser);
router.patch('/updateRole/:id', auth, authAdmin, userController.updateRole);
router.post('/create', auth, authAdmin, userController.createUser);
router.patch('/updateUser/:id', auth, authAdmin, userController.updateUser);
router.post('/google_login', userController.googleLogin);
router.post('/facebook_login', userController.facebookLogin);
router.post('/email_subscribe', userController.receiveEmail);

module.exports = router;
