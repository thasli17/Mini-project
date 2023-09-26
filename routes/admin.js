const express = require('express');
const admin = express.Router();


const adminController = require('../controller/adminController');
const adminProductController = require('../controller/adminProductController')
const adminMiddleware = require('../middleware/adminMiddlewre')


admin.get('/login',adminController.loginGet);
admin.post('/login',adminController.loginPost);

admin.get('/dashboard',adminController.adminDashboard)
admin.get('/user',adminController.adminUser);
admin.get('/category',adminProductController.category)
admin.get('/addCategory',adminProductController.addCategoryPage)
admin.post('/addCategory',adminProductController.addCategory)

admin.get('/addProduct',adminProductController.addProductget)
admin.post('/addProduct',adminMiddleware.uploadProductImg.array('img-file',{maxcount : 3}),adminProductController.addProductPost)
admin.get('/product',adminProductController.Product)

admin.get('/product/editProduct/:id',adminProductController.productEditPage)
admin.post('/product/editProduct/:id',adminMiddleware.uploadProductImg.single('img-file'),adminProductController.productEdit)

admin.get('/product/unlist/:id',adminProductController.productUnblock)
admin.get('/product/list/:id',adminProductController.productBlock)



admin.get('/user/block/:id',adminController.block)
admin.get('/user/unblock/:id',adminController.unblock)
admin.get('/logout',adminController.logout)
admin.get('/product',adminController.adminProducts)

module.exports = admin