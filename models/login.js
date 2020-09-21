const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

const keyType = Joi.required();
const stringType = Joi.string().required().strict();


const loginSchema = Joi.object().keys({
    userName: stringType,
    passWord: stringType
});

module.exports.validateLogin = function (userName, passWord) {
    try {
        let validationRes = {};
        let validationObj = {
            "userName": userName,
            "passWord": passWord
        };
        let validation = loginSchema.validate(validationObj);
        if (validation.error != null) {
            validationRes.isValid = false;
            validationRes.schemaValidation = { "status": "Failed", "datails": validation.error.datails }
        } else {
            validationRes.isValid = true;
            validationRes.schemaValidation = { "status": "Passed", "details": "" }
        }
        return validationRes;
    } catch (err) {
        console.log("Login Validation Failed..");
        throw err;
    }
}