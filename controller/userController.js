"user Strict"

let userService = require('../services/userService.js');

/*
    function name : registerUser
    purpose : To register in app  
    Params 	: firstName,LastName,userEmail,Password
    Method: Post
*/
exports.registerUser = function (req, res, next) {
    try {
        let reqBody = req.body;
        reqBody['status'] = "isRegistered";

        userService.registerUser(reqBody, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : loginUser
    purpose : To login in to an app  
    Params 	: userEmail,Password
    Method: Post
*/
exports.loginUser = function (req, res, next) {
    try {
        let reqBody = req.body;
        userService.loginUser(reqBody, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : viewProfile
    purpose : To view user profile  
    Params 	: _id (required)
    Method: get
*/
exports.viewProfile = function (req, res, next) {
    try {
        let reqBody = req.params;
        var reqHead = req.headers;
        userService.viewProfile(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : editProfile
    purpose : To edit user profile using an app  
    Params 	: _id (required)
    Method: patch
*/
exports.editProfile = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        userService.editProfile(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : deleteUser
    purpose : To delete user profile   
    Params 	: _id (required)
    Method: post
*/
exports.deleteUser = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        userService.deleteUser(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}
/*
    function name : viewAllUsers
    purpose : To view all user in an app  
    Params 	: 
    Method: get
*/
exports.viewAllUsers = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        userService.viewAllUsers(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}