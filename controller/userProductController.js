const UserCollection = require('../models/userSchema')
const ProductCollection = require('../models/product')
const CategoryCollection = require('../models/category')


const getTotalSum = async (email) => {
    try{

        const cartSum = await UserCollection.aggregate([
            {
                $match:{email}
            },
            {
                $unwind:'$cart'
            },
            // {
            //     $lookup : {
            //         from:'products',
            //         localField:'cart._id',
            //         foreignField:'_id',
            //         as:'cartProducts'
            //     }
            // },
            // {
            //     $unwind:'$cartProducts'
            // },
            // {
            //     $match:{'cartProducts.isAvailable':true}
            // },
            {
                $project: {_id :0, each : {$multiply :['$cart.quantity','$cart.productPrice']}}
                
            },
            {
                $group:{
                    _id:null,
                    total : {
                        $sum : '$each'
                    }
                }
            }


        ])

        return cartSum
        
    }catch(e){
        return e
    }
}

module.exports={
cart:async(req,res)=>{
    try{
        
            const productId = req.params.id;
            const email = req.session.user;
            const selectedSize = req.query.size;
            const product = await ProductCollection.findOne({_id:productId})
            const cart = {
                productImg:product.productImg,
                productName: product.productName,
                quantity:1,
                productPrice:product.productPrice,
                size:selectedSize,
                
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
            let cartSum = await getTotalSum(email)
            let total = cartSum[0].total
            const cartItems = user.cart;
            res.render('user/cart',{cartItems,total,isUser:true})
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

res.json({
    success : true,
    //  total : updateTotal[0].total
})

}catch(e){
console.log(e)
res.json({message : 'could not complete try again'})
}

},

updateCartQuantity : async (req,res) =>{
    try{
        let email = req.session.user;
        let quantity = Number(req.query.quantity);
        console.log(quantity);
        let productId = req.query.productId;
        console.log(productId);
        let updateQuantity = await UserCollection.findOneAndUpdate(
            {
                email,'cart._id':productId
            },
            {
                $set:{'cart.$.quantity':quantity}
            })

            let total = await getTotalSum(email)
            
            res.json({
                success : true,
                total : total[0].total
            })

    }catch(e){
        console.log(e);
        res.json({
            message : 'Could not complete',
            success:false
        })
    }
}



}

