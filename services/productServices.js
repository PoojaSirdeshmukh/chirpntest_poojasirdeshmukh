"user strict"
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');
var secret = 'TESTSECRET';

const productModel = require('../models/productModel.js').product;


async function addProducts(data,data1, successData, errorData) {
    try {
       
        let token = data1['accesstoken'];
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
        });

        let resArr = await productModel.find({$and:[{ "userId": data.userId },{"productName":data.productName},{"category":data.category}]});
            if (resArr.length > 0) {
                successData(RESPONSE.sendResponse(true, true, resArr, MESSAGE.PRODUCT_EXIST, STATUS_CODE.OK));
            } else {
               let result = await productModel(data).save()
                    if (result) {
                        successData(RESPONSE.sendResponse(true, true, result, MESSAGE.INSERT_DATA, STATUS_CODE.OK));
                    } else {
                        successData(RESPONSE.sendResponse(true, false, null, MESSAGE.BAD_REQUEST, STATUS_CODE.NOT_FOUND));
                    }
                }   
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function updateProduct(data,data1,successData,errorData){
    let token = data1['accesstoken'];
    jwt.verify(token, secret, function (err, decoded) {
        if (err)
            errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
    });
    let resArr = await productModel.findOneAndUpdate({ '_id': data._id}, { $set: data })
        if (resArr) {
            successData(RESPONSE.sendResponse(true, true, resArr, MESSAGE.UPDATE_DATA, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(null, null, null, MESSAGE.UPDATE_DATA_FAILED, STATUS_CODE.BAD_REQUEST));
        }
}

async function deleteProduct(data,data1,successData,errorData){
    let token = data1['accesstoken'];
    jwt.verify(token, secret, function (err, decoded) {
        if (err)
            errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
    });
    let resArr = await productModel.remove({'_id': data._id}, { $set: data });
        if (resArr) {
            successData(RESPONSE.sendResponse(true, true, resArr, MESSAGE.DATA_DELETED_SUCCESS, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(null, null, null, MESSAGE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST));
        }
}

async function getProductList(data,data1,successData,errorData){
   
    let token = data1['accesstoken'];
    jwt.verify(token, secret, function (err, decoded) {
        if (err)
            errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
    });
    let resArr = await  productModel.aggregate([
        { $match: { "userId": ObjectId(data.userId) } },
        {
            $lookup:
            {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { "$unwind": "$user" }])
        if (resArr) {
            successData(RESPONSE.sendResponse(true, true, resArr, MESSAGE.SUCCESS, STATUS_CODE.OK));
        } else {
            successData(RESPONSE.sendResponse(null, null, null, MESSAGE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST));
        }
}

module.exports.addProducts = addProducts;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProductList = getProductList;