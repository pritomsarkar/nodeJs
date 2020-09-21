const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

const keyType = Joi.required();
const stringType = Joi.string().required().strict();
const emailType = Joi.string().email({ tlds: { allow: false } });


const loginSchema = Joi.object().keys({
    email: emailType,
    passWord: stringType
});

module.exports.validateLogin = function (email, passWord) {
    try {
        let validationRes = {};
        let validationObj = {
            "email": email,
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