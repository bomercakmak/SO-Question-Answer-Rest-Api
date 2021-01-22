const User = require('../models/User');
const asyncErrorWrapper = require("express-async-handler")
const CostumError = require('../helpers/error/CostumError');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers')
const {validateUserInput,comparePassword} = require('../helpers/input/inputHelpers')
const sendEmail = require("../helpers/libraries/sendEmail")
const register = asyncErrorWrapper(async function (req, res, next) {

    
    const{name,email,password,role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });
    sendJwtToClient(user,res)
});

const login = asyncErrorWrapper(async  (req, res, next) =>{ 
    const { email, password } = req.body;
    if (!validateUserInput(email,password)){
        return next(new CostumError("Please check your email and password",400));
    }

    const user = await User.findOne({ email }).select("+password")
        if (!comparePassword(password,user.password)) {
            return next(new CostumError("Please check your credentials",400))
        }
        sendJwtToClient(user,res)

})
const logout = asyncErrorWrapper(async  (req, res, next) => {
    const { NODE_ENV } = process.env;
    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Logout Seccessfull"
    });
});
const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })

}
const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    //  Image Uploud Success
   const user =  await User.findByIdAndUpdate(req.user.id, {
        "profile_image":req.savedProfileImage
    }, {
            new: true,
            runValidators:true
    })

    res.status(200).json({
        success: true,
        message: "Image Upload Success",
        data: user
    });

});

//Forgot Password
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return next(new CostumError("There is no user with email", 400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href = '${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1 hour</p>
    `;

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset your password",
            html: emailTemplate
            
        });
        return res.status(200).json({
            success: true,
            message: "Token Sent to Your email"
        });
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return next(new CostumError("Email Could Not Be Sent", 500));
    }
    
});


const editDetails = asyncErrorWrapper(async (req, res, next) => {

    const editInformation = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
        new: true,
        runValidators:true
    })
    return res.status(200).json({
        success: true,
        data: user
    })

})


module.exports = {
    register,
    login,
    getUser,
    logout,
    imageUpload,
    forgotPassword,
    editDetails
}