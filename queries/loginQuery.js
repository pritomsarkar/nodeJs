const db = require('./dbConncetions');

module.exports.checkUserPassword = async function (email, password) {
    try {
        // fetch email and password from db
        let query = `For doc in users
                     filter doc.email_id == "${email}" AND doc.password == "${password}"
                     return doc`;
        let result = await db.query(query);
        return result._result;
    } catch (err) {
        console.log("Arango query fetch Failed...", err);
        throw err;
    }
}