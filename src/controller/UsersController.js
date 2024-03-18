const { query } = require('express');
const UserModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');
const OtpModel = require('../models/OtpModel');
const SendEmailUtility = require('../utility/SendEmailUtility');

//Registration Start
exports.Registraion = async (req, res) => {
    try {
        const reqBody = req.body;
        const user = await UserModel.create(reqBody);
        res
            .status(200)
            .json({status: "sucess", data: user})

    } catch (error) {
        res
            .status(200)
            .json({status: "fail", message: error.message})
    }
}
//Registration End

//Login Start
exports.Login = async (req, res) => {
    try {
        const reqBody = req.body;
        let user = await UserModel.findOne({email: reqBody.email});
        if (!user) {
            return res.status(200).json({status: "fail", data: "User not found"})
        }
        if (user.password !== reqBody.password) {

            return res.status(200).json({status: "fail", data: "Invalide Password"})
        } else {

            let payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                data: user['email']
            };
            let token = jwt.sign(payload, '12345')
            //Projection
            const responseData = {email:user['email'], firstName:user['firstName'], lastName: user['lastName'], profilePicture: user['profilePicture']}
            res.status(200).json({status: "sucess", data: responseData, token: token})
        }
    } catch (error) {
        res.status(200).json({status: "fail", data: error.message})
    }
}
//Login End

//Profile Info Start
exports.ProfileInfo = async(req, res)=>{
    try {
        let email = req.headers.email
        let query = {email:email}
        const user = await UserModel.findOne(query)
        const responseData = {email:user['email'], firstName:user['firstName'], lastName: user['lastName'], profilePicture: user['profilePicture']}
        res.status(200).json({status:"Sucess", data: responseData})

    } catch (error) {
        res.status(200).json({status: "fail", data: error.message})
    }
}
//Profile Info End

//Update Start
exports.UpdateProfile = async (req, res) => {
    try {
        let email = req.headers.email
        let reqBody = req.body
        let query = {email: email}
        const user = await UserModel.updateOne(query, reqBody)
        res.status(200).json({status:"Sucess", data: user})


    } catch (error) {
        res.status(200).json({status: "fail", data: error.message})
    }
}
//Update End

//Email Verify Start
exports.EmailVerify = async (req, res)=>{
    try {
        let email = req.params.email
        let query = {email:email}
        let otp = Math.floor(100000 + Math.random() * 900000)
        const user = await UserModel.findOne(query)
        if(!user){
        res.status(200).json({status: "fail", data: "User not found"})
        }
       else{
        //Step 1
        let creatOtp = await OtpModel.create({email:email, otp:otp})
        //Step 2
        let sendEmail = SendEmailUtility(email,"To-Do_Lister Password Verification", `Your OTP is ${otp}`)
        res.status(200).json({status:"Sucess", data: "OTP send successfully"})
       }


    } catch (error) {
        res.status(200).json({status: "fail", data: error.message})
    }
}
//Email Verify End

//OTP verify Start
exports.OtpVerify = async (req, res) => {
    try {
        const email = req.params.email;
        const otp = req.params.otp;
        const status = 0;
        const updateStatus = 1;

        const otpCheck = await OtpModel.countDocuments({ email: email, otp: otp });

        if (otpCheck > 0) {
            const updateOtp = await OtpModel.updateOne(
                { email: email, otp: otp, status: status },
                { $set: { status: updateStatus } }
            );

            res.status(200).json({ status: "success", data: "OTP verified successfully" });
        } else {
            res.status(200).json({ status: "fail", data: "Invalid OTP" });
        }

    } catch (error) {
        res.status(200).json({ status: "fail", data: error.message });
    }
};
//OTP verify End

//Rest pass Start
exports.ResetPassword = async (req, res)=>{
    try {
       let email = req.body.email
       let otp = req.body.otp
       let updatePassword = req.body.password
        let updateStatus = 1

        let otpCheck = await OtpModel.aggregate([
            {$match: {email:email, otp: otp, status: updateStatus}},
            {$count: "total"}
        ])
        if(otpCheck.length>0){
            let passwordUpdate = await UserModel.updateOne({email:email},{password:updatePassword})
            res.status(200).json({ status: "success", data: "Password Updated successfully" });
        }
        else{

            res.status(200).json({ status: "fail", data: "Invalide OTP"});
        }

    } catch (error) {
        res.status(200).json({ status: "fail", data: error.message });
    }
}
//Rest pass End