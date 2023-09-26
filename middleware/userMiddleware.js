const UserCollection = require('../models/userSchema')


module.exports={
    isBlocked: async(req,res,next)=>{
        try{
            const email = req.body.email ? req.body.email : req.session.user
            const user = await UserCollection.findOne({email}) 
            if(user.isBlocked){
                return res.render('user/login',{message:'Your account has been blocked.contact the administrator for assistance.'})
            }
            next()
        }
        catch(error){
            return res.render('user/login',{message : 'Error check your email'})
        }
    },
    
}