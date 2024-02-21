const UserModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');

//registration start
exports.Registraion = async (req, res) => {
    try {
        const reqBody = req.body;
        const user = await UserModel.create(reqBody);
        res
            .status(201)
            .json({status: "sucess", data: user})

    } catch (error) {
        res
            .status(400)
            .json({status: "fail", message: error.message})
    }
}
//registration end Login Start
exports.Login = async (req, res) => {
    try {
        const reqBody = req.body;
        let user = await UserModel.findOne({email: reqBody.email});
        if (!user) {
            return res
                .status(400)
                .json({status: "fail", message: "User not found"})
        }
        if (user.password !== reqBody.password) {

            return res
                .status(400)
                .json({status: "fail", message: "Invalide Password"})
        } else {

            let payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                data: user['email']
            };
            let token = jwt.sign(payload, '12345')

            res
                .status(201)
                .json({status: "sucess", data: user, token: token})
        }
    } catch (error) {
        res
            .status(400)
            .json({status: "fail", message: error.message})
    }
}
//Login End Update start

exports.UpdateProfile = async (req, res) => {
    try {
        let email = req.headers.email
        let reqBody = req.body
        let query = {email: email}
        const user = await UserModel.updateOne(query, reqBody)
        res.status(200).json({status:"Sucess", data: user})


    } catch (error) {
        res
            .status(400)
            .json({status: "fail", message: error.message})
    }
}

//Update end