let loginQuery = require('../queries/loginQuery');

module.exports.checkUserLogin = async function (email, password) {
    try {
        let userExsist = await loginQuery.checkUserPassword(email, password);
        if (userExsist.length > 0) {
            return userExsist[0];
        } else {
            return "Invaild";
        }
    } catch (err) {
        console.log("User Login Failed...", err);
        throw err;
    }
}