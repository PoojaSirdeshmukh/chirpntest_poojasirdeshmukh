'use strict';

class Response {

    static sendResponse(isSuccess, isEmpty, result, message, statusCode) {

        var response = {};

        if (isSuccess) {
           
            response.statusCode = statusCode;
            response.success = true;
            response.result = isEmpty;
            response.message = message;
            response.data = result;
        } else {
           
            response.statusCode = statusCode;
            response.success = false;
            response.result = isEmpty;
            response.message = message;
            response.data = result;

        }
        return response;
    }

    static internalServerError(message) {

        var response = {};
        response.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
        response.success = false;
        response.result = false;
        response.message = message;
        response.data = null;
        return response;
    }
}

module.exports = Response;