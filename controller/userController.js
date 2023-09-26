const UserCollection = require('../models/userSchema')
const ProductCollection = require('../models/product')
const CategoryCollection = require('../models/category')
module.exports = {

// LOGIN GET AND POST

    loginGet: (req,res)=>{
        res.render('user/login')
    }, 
    loginPost: async(req,res)=>{
        const{email,password} = req.body;
            try{
                const user = await UserCollection.findOne({email,password})
                if(!user){
                        res.render('user/login',{message:'Incorrect Email or Password'})
                    }else{
                        req.session.user =email
                        res.redirect('/')
                    }  
                }catch(error){
                    console.log('error in login',error);           
                }                 
    },

// SIGNUP GET AND POST

    signupGet:(req,res)=>{
        console.log('signup');
        res.render('user/signup')
    },
    signupPost: async(req,res)=>{
        const{email}=req.body;
        try{
            const checkUser = await UserCollection.find({email})
            if(checkUser.length){
                return res.render('user/signup',{message:'Email already exist!'})
            }
            
        }
        catch(error){
                console.log(error);
                return res.render('user/signup')
        }
        try{
            const newUser = new UserCollection({username,email,phone,password});
            await newUser.save()
          return  res.render('user/login',{message:'User created seccessfully'})
        }
        catch(error){
            console.log(error);
        }
    },

 

//HOME REQUEST
  
    home: async (req,res)=>{
        try{
            const products =  await ProductCollection.find({isAvailable:true}).limit(7)
            if(req.session.user){                
                // console.log(products);
            res.render('user/home',{products,isUser:true})
            }else{
                res.render('user/home',{products})
            }
           
        }catch(error){
            console.log(error);
        }
    },

//SHOP REQUEST
    shop: async(req,res)=>{
        try{
            const products = await ProductCollection.find({isAvailable:true}).limit(12)
       
        if(req.session.user){
            res.render('user/shop',{products,isUser:true})
        }else{
            res.render('user/shop',{products})
        }
    }catch(error){
        console.log(error);
    }
        
    }, 
   
   



    //     const cart1 = user.cart
    //     if(req.session.user){
    //         res.render('user/cart',{cart1,isUser:true})
    //     }else{
    //         res.redirect('/login');
    //     }
    // }catch(error){
    //     console.log(error);
    // }
       
    

        quickview:async(req,res)=>{
        try{
            const productId = req.params.id;
            const product = await ProductCollection.findOne({_id:productId})
            res.render('user/quickView',{product,isUser:true})
        }
        catch(error){
            console.log(error);
        }
  
    },

    filter:async(req,res)=>{

        const men = await ProductCollection.findById({productCategory:'MEN'})
        const women = await ProductCollection.findById({productCategory:'WOMEN'})
        const category = await CategoryCollection.find({})
  try{
    if(category.categoryName){
        console.log(men);
        res.render('user/shop',{men,category})
    }else{
        res.render('user/shop',{women})
    }
  }catch(error){
    console.log(error);
  }
       
        

    },

   
    


    //LOGOUT REQUEST
logout:(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error);
        }
       
    res.redirect('/')

    })
}

}



