"user strict"
var bcrypt = require('bcryptjs');
let userModel = require('../models/userModel').users;
var jwt = require('jsonwebtoken');
var secret = 'TESTSECRET';

async function registerUser(data, successData, errorData) {
    try {

        let userEmail = data.userEmail.toLowerCase();
        var salt = bcrypt.genSaltSync(10);
        var hash_password = bcrypt.hashSync(data.password, salt);
        data.password = hash_password;
        let isUserExists = await userModel.findOne({ "userEmail": userEmail });

        if (isUserExists) {
            successData(RESPONSE.sendResponse(true, true, null, MESSAGE.REGISTER_ERROR, STATUS_CODE.OK));
        } else {
            let result = await userModel(data).save();
            successData(RESPONSE.sendResponse(true, true, result, MESSAGE.REGISTERSUCCESS, STATUS_CODE.OK));
        }

    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function loginUser(data, successData, errorData) {
    try {
        let result = await userModel.findOne({ "userEmail": data.userEmail });

        if (result) {
            if (bcrypt.compareSync(data.password, result.password)) {

                let res = JSON.parse(JSON.stringify(result));
                var token = jwt.sign({
                    data: result
                }, secret, { expiresIn: '7d' });
                res['accessToken'] = token;

                successData(RESPONSE.sendResponse(true, true, res, MESSAGE.LOGINSUCCESS, STATUS_CODE.OK));
            } else {
                errorData(RESPONSE.sendResponse(null, null, null, MESSAGE.PASSERROR, STATUS_CODE.INTERNAL_SERVER_ERROR));
            }
        } else {
            errorData(RESPONSE.sendResponse(null, null, null, MESSAGE.USERERROR, STATUS_CODE.INTERNAL_SERVER_ERROR));
        }
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function viewProfile(data,data1,successData, errorData) {
    try {

        let token = data1['accesstoken'];
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
        });

        let isUserExists = await userModel.findOne({ "_id": data._id });

        if (isUserExists) {
            successData(RESPONSE.sendResponse(true, true, isUserExists, MESSAGE.USERFOUNDSUCCESS, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(true, true, null, MESSAGE.USERNOTFOUND, STATUS_CODE.OK));
        }

    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function editProfile(data,data1, successData, errorData) {
    try {

        let token = data1['accesstoken'];
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
        });
        let result = await userModel.findOneAndUpdate({ "_id": data._id }, { $set: data }, { new: true });
        if (result) {
            successData(RESPONSE.sendResponse(true, true, result, MESSAGE.UPDATE_DATA, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(true, true, result, MESSAGE.UPDATE_DATA_FAILED, STATUS_CODE.OK));
        }

    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function deleteUser(data,data1, successData, errorData) {
    try {

        let token = data1['accesstoken'];
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
        });
        let result = await userModel.findOneAndDelete({ "_id": data._id });
        if (result) {
            successData(RESPONSE.sendResponse(true, true, null, MESSAGE.SUCCESS, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(true, true, null, MESSAGE.SUCCESS, STATUS_CODE.OK));
        }

    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function viewAllUsers(data,data1, successData, errorData) {
    try {

        let token = data1['accesstoken'];
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
        });
        let result = await userModel.find();
        if (result) {
            successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
        }

    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}



module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.viewProfile = viewProfile;
module.exports.editProfile = editProfile;
module.exports.deleteUser = deleteUser;
module.exports.viewAllUsers = viewAllUsers;