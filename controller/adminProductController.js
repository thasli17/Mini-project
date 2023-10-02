const CategoryCollection = require("../models/category");
const ProductCollection = require('../models/product')





module.exports = {
  addCategory: async (req, res) => {
    try{
    const { name, description } = req.body;
    const newCategory = await CategoryCollection.create({categoryName : name,categoryDesc : description})
    res.redirect('/admin/category')
    }catch(error){
        console.log(error)
    }
  },
  addCategoryPage: async (req,res)=>{
    try{
        if(req.session.isAdmin){
            res.render('add-category')
        }
        else{
            res.redirect('/admin/login')
        }
        
    }catch(error){
        console.log(error)
    }
   
},
category : async (req,res)=>{
    try{
        if(req.session.isAdmin){
            const category = await CategoryCollection.find({})
            res.render('category', {category})
        }else{
            res.redirect('/admin/login')
        }
       
    }
    catch(error){console.log(error)}
},
addProductPost: async (req,res)=>{
    try{
        console.log(req.files);
        const images = []
        for(let each of req.files){
            
            images.push('/'+each.path.slice(7))
        }
    // Extract selected sizes from the request
    const selectedSizes = req.body.size;
    const selectAllSizes = req.body.selectAllSizes === "true";

    // Define all available sizes
    const allSizes = ['5', '6', '7', '8', '9', '10']; // Modify this array with all available sizes
    // Determine the sizes to save based on "Select All" selection
    const sizesToSave = selectAllSizes ? allSizes : selectedSizes;
       
        const productData ={
            productName: req.body.productName,
            productPrice: req.body.price,
            productQuantity:req.body.quantity,
            productCategory:req.body.category,
            productDescription:req.body.description,
            productImg: images,
            isAvailable:true,
            size: sizesToSave, // Use sizesToSave in your product data
            
        }
    
        const newProduct = await ProductCollection.create(productData)
        return res.redirect('/admin/product')
    
    } catch(error){
        console.log(error);
    }
        },

        addProductget: async (req,res)=>{
            try{
                if(req.session.isAdmin){
                    const category = await CategoryCollection.find({})
                    res.render('add-product',{category})
                }else{
                    res.redirect('/admin/login')
         
            }
 
        }catch(error){
            console.log(error);
        }
        },

        Product:async (req,res)=>{
            try{
                const products = await ProductCollection.find({})
                res.render('adminProducts',{products})
            }
            catch(error){
                console.log(error);
            }

        },
        productEditPage:async (req,res)=>{  
            try{
                if(req.session.isAdmin){
                 const productId = req.params.id
                    const product = await ProductCollection.findOne({_id:productId})
                    const category =  await CategoryCollection.find({})
                    res.render('editProduct',{product,category})
                }else{
                    res.redirect('/admin/login')
                }
            }catch(error){
                console.log(error);
            }         
         
        },

        productEdit:async(req,res)=>{
            const productId = req.params.id;
            console.log(productId);
    
    let updateProduct;

    if (req.file?.path) {
        updateProduct = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            productDescription: req.body.productDescription,
            productImg: req.file.path,
        }
    } else {
        updateProduct = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            productDescription: req.body.productDescription,
        };
    }

    try {
        const updated = await ProductCollection.findOneAndUpdate({_id: productId },{$set:updateProduct},{new:true})
    
    //    console.log(updated);
        console.log('Products updated successfully:', updated);
        res.send('Products updated successfully');
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).send('Internal Server Error');
    }
    
},



        productBlock:async(req,res)=>{
         const productId = req.params.id;
         console.log(productId);
            try{
                const blockProduct = await ProductCollection.findByIdAndUpdate(productId,{isAvailable:false})
                // if(!blockProduct)
                //     console.log('Product not found');
                // else
                //     console.log('product Blocked',blockProduct);
                
            }catch(error){
                console.log('Error blocking in product',error);
            }
            res.redirect('/admin/product')
        },

        productUnblock:async(req,res)=>{
            const productId = req.params.id;
            console.log(productId);
            try{
                const unblockProduct = await ProductCollection.findByIdAndUpdate(productId,{isAvailable:true})
                // if(!unblockProduct)
                //     console.log('Product not found');
                // else
                //     console.log('product unblocked',unblockProduct);
                
            }
            catch(error){
                console.log('Error in unblocking product',error);
            }
            res.redirect('/admin/product')
        }
    
    
};


