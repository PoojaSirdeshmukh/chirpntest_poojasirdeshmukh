"use strict";
var express = require('express');
var router = express.Router();

var userController = require('../controller/userController.js');

router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);
router.get('/viewProfile/:_id', userController.viewProfile);
router.patch('/editProfile', userController.editProfile);
router.post('/deleteUser', userController.deleteUser);
router.get('/viewAllUsers', userController.viewAllUsers);


module.exports = router;