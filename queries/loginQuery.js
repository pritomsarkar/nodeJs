const db = require('./dbConncetions');

module.exports.checkUserPassword = async function (userName, password) {
    try {
        let query = `For doc in users
                     filter doc.user_name == "${userName}" AND doc.password == "${password}"
                     return doc`;
        let result = await db.query(query);
        return result._result;
    } catch (err) {
        console.log("Arango query fetch Failed...", err);
        throw err;
    }
}