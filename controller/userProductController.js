const UserCollection = require('../models/userSchema')
const ProductCollection = require('../models/product')
const CategoryCollection = require('../models/category')


module.exports={
cart:async(req,res)=>{
    try{

        const productId = req.params.id;
    
    
    const email = req.session.user;
    const product = await ProductCollection.findOne({_id:productId})
    const cart = {
        productImg:product.productImg,
        productName: product.productName,
        quantity:1,
        productPrice:product.productPrice
    }
    const user = await UserCollection.findOneAndUpdate({email},{$push:{cart:cart}})

    return  res.json({
        successMsg: true,
    })
}catch(e){
        console.log(e)
        return res.json({error : e.message})
   }
},

cartPage:async(req,res)=>{
    try{
        if(req.session.user){
            const email = req.session.user;
            const user = await UserCollection.findOne({email})
            const cartItems = user.cart;
            // console.log(cartItems);
            res.render('user/cart',{cartItems,isUser:true})
        }
        else{
            res.redirect('/login')
        }
    }
    catch(error){
        console.log(error);
    }

},
deleteCart:async(req,res)=>{
    try{

    
    const email = req.session.user;
    const productId = req.params.id;
    const updatedQuery={
        //removes the object from the cart that having the given product_id
    $pull :{
        cart:{_id:productId}
    }
}
const deleteCartItems = await UserCollection.findOneAndUpdate({email},updatedQuery)
const cartItems = deleteCartItems.cart

res.render('user/cart',{cartItems,isUser:true})
}catch(error){
    console.log(error);
}

},

}