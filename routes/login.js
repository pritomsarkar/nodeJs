const { required } = require('@hapi/joi');
const { response } = require('express');
const express = require('express');
const validation = require('../models/login');
const utils = require('../utils/login');
const authCtrl = require('../utils/responsePerser');

const app = express();
const router = express.Router();


router.get('/', async function (req, res, next) {
    try {
        // login api
        let email = req.body.email;
        let password = req.body.passWord;
        let result;
        let validate = validation.validateLogin(email, password);
        if (validate.isValid) {
            let checkUserPassword = await utils.checkUserLogin(email, password);
            if (checkUserPassword !== "Invaild") {
                result = checkUserPassword;
            } else {
                result = "Email Id Or Password Not Vaild";
            }
        } else {
            result = "Validation Failed";
        }
        authCtrl.sendJsonResponse(res, result, 400);
    } catch (error) {
        console.log("API failing in login.......");
        authCtrl.sendJsonErrorResponse(res, 2002, next, error)
    }
});

module.exports = router;



