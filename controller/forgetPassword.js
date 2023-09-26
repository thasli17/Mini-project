

const UserCollection = require('../models/userSchema')
const TokenCollection = require('../models/token')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { error } = require('console')

module.exports ={



forgetPassword:(req,res)=>{
    res.render('user/forgetPassword')

},

forgetPasswordPost: async(req,res)=>{
    const email = req.body.email;

    try{
        const user = await UserCollection.findOne({email:email})
        if(!user){
           return res.render('user/forgetPassword',{message:'user does not exist!!'})
        }

    
    const resetToken = crypto.randomBytes(20).toString('hex')  // Generate a unique reset token

// Create a new TokenCollection document

   const token = new TokenCollection({
    token : resetToken,
    userId : user._id,    // Associate the token with the user's _id
    expiration: new Date(Date.now()+3600000)  // Set the token to expire in 1 hour
   })

   await token.save();

    
    const transporter = nodemailer.createTransport({  // Send an email with a reset link
        service : 'gmail',
        auth: {
            user:'thasleem.1tk@gmail.com',
            pass:'quemrgoztqvkqrvx'
        }
    })

    const mailOption ={
        from : 'thasleem.1tk@gmail.com',
        to : email,
        subject: 'Password Reset',
        text:`Click this link to reset your password: http://localhost:3201/reset/${resetToken}`
        
        
    }
    transporter.sendMail(mailOption, (error,info)=>{
        if(error){
            console.log(error);
            return res.render('user/forgetPassword',{message:'Error sending email'})
        }
        else{
            console.log('Email sent: ' + info.response);
           return res.render('user/forgetPassword',{message:'Password reset link sent to your email'});
        }
    })
}
catch(error){
    console.log(error);
}
    
},

resetPassword:(req,res)=>{
    const resetToken = req.params.token
    res.render('user/resetPassword',{resetToken})
},

resetPasswordPost: async (req, res) => {
    const newPassword = req.body.password;
    const resetToken = req.params.token;
    console.log(resetToken);

    try {
        // Find the token associated with the user
        const token = await TokenCollection.findOne({ token: resetToken });
        console.log(token);

        if (!token) {
            return res.render('user/resetPassword', { message: 'Invalid or Expired Token' });
        }

        // Check if the token has expired
        if (token.expiration < Date.now()) {
            return res.render('user/resetPassword', { message: 'Token has expired' });
        }

        // Find the user with the associated token
        const user = await UserCollection.findOne({ _id: token.userId });

        if (!user) {
            return res.render('user/resetPassword', { message: 'User not found' });
        }

        // Update the user's password
        user.password = newPassword;

        // Clear the reset token and expiration date
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        console.log('token cleared');

        await user.save(); // Save the updated user document with the new password and without the reset token

        return res.render('user/resetPassword', { message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        return res.status(500).render('error', { message: 'Internal server error' });
    }
}


}