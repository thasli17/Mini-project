const express = require('express')
const user = express.Router();


const userController = require('../controller/userController')
const userMiddleware = require('../middleware/userMiddleware');
const forgetPassword = require('../controller/forgetPassword');
const userProductController = require('../controller/userProductController');


user.get('/',userController.home)

user.get('/login',userController.loginGet)
user.post('/login',userMiddleware.isBlocked,userController.loginPost)
user.get('/signup',userController.signupGet)
user.post('/signup',userController.signupPost)

user.get('/logout',userController.logout)

user.get('/forgetPassword',forgetPassword.forgetPassword)
user.post('/forgetPassword',forgetPassword.forgetPasswordPost)
user.get('/reset/:token',forgetPassword.resetPassword)
user.post('/resetPassword/:token',forgetPassword.resetPasswordPost)




user.get('/home',userController.home)

user.get('/shop',userController.shop)
user.get('/shop/filter',userController.filter)

user.get('/quickview/:id',userController.quickview)




user.get('/addToCart/:id',userProductController.cart)
user.get('/cart',userProductController.cartPage)
user.delete('/cart/delete/:id',userProductController.deleteCart)
user.get('/cart/updateQuantity',userProductController.updateCartQuantity)


module.exports = user