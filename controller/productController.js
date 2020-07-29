const productServices = require('../services/productservices.js');



/*
    function name : addProducts
    purpose : To add products in to an app  
    Params 	: userId,productName,category
    Method: Post
*/
exports.addProducts = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        productServices.addProducts(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


/*
    function name : updateProduct
    purpose : To update products in to an app  
    Params 	: _id,productName,category
    Method: Post
*/
exports.updateProduct = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        productServices.updateProduct(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : deleteProduct
    purpose : To dalete particular products in to an app  
    Params 	: _id
    Method: Post
*/
exports.deleteProduct = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        productServices.deleteProduct(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

/*
    function name : getProductList
    purpose : To get all products added by product owner in to an app  
    Params 	: userId
    Method: Post
*/
exports.getProductList = function (req, res, next) {
    try {
        let reqBody = req.body;
        var reqHead = req.headers;
        productServices.getProductList(reqBody,reqHead, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}