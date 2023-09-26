const AdminCollection = require('../models/adminSchema');
const UserCollection = require('../models/userSchema')
const { loginPost } = require('./userController');
const mongoose = require('mongoose')
// const { isValidObjectId } = mongoose;


module.exports = {
adminDashboard :(req,res)=>{
    if(req.session.isAdmin){
        res.render('adminDashboard')
    }
    else{
        res.redirect('/admin/login')
    }
    
},

loginGet:(req,res)=>{
    res.render('adminLogin',{isAdmin:true})
},
loginPost:async (req,res)=>{
    try{
        const {email,password} = req.body;
        const isAdmin = await AdminCollection.findOne({email})
        if(isAdmin && password === isAdmin.password){
            req.session.isAdmin = true
            return res.redirect('/admin/dashboard')
        }
        else{
            return res.render('adminLogin',{error:'No authorization',isAdmin:true})
        }
    }
    catch(error){
        console.log('adminLogin',error);
        return res.redirect('/adminDashboard')
    }
    
},
adminUser: async(req,res)=>{
    try{
        if(req.session.isAdmin){
            const datas = await UserCollection.find({})
            // console.log(datas);
            res.render('adminUser',{datas})
        }
        else{
            res.redirect('/admin/login')
        }
    }
    catch(error){
        console.log('adminUser',error);
    }
   
},

   //Block User

   block: async (req,res)=>{
    const userId = req.params.id;
    try{
       const blockUser = await UserCollection.findByIdAndUpdate(userId,{isBlocked:true});
       if(!blockUser)
       console.log('User not found');
       else
        console.log('User Blocked',blockUser);
    
    }
    catch(error){
        
            console.error('Error blocking in user:', error);
        
    }
    res.redirect('/admin/user')
},

// Unblock User

unblock: async(req,res)=>{
    const userId = req.params.id;
    try{
      const unblockUser =  await UserCollection.findByIdAndUpdate(userId,{isBlocked:false})
      if(!unblockUser)
      console.log('User not found');
    else
    console.log('User unblocked',unblockUser);
    }catch(error){
        console.log('Error unblocking user:', error);
        
    }
    res.redirect('/admin/user')
},

// Edit user






adminProducts:(req,res)=>{
    if(req.session.isAdmin){
        res.render('adminProducts')
    }
    else{
        res.redirect('/admin/login')
    }
},

logout: (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error);
        }
        res.redirect('/admin/login')
    })

}

}
