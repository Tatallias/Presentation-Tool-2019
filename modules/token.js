let secretSash;
try {
    secretSash = require("../modules/badWolf");
} catch (err) {
    //not local.
}

const secret = process.env.secret || secretSash.secret;
const jwt = require('jsonwebtoken');

const checkToken = function (req, res, next) {
    let token = req.headers['authorization'];

    if (token) {
        try {
            logindata = jwt.verify(token, secret);
            next();
        } catch (err) {
            res.status(403).json({msg: "Not a valid token"});
        }
    } else {
        res.status(403).json({msg: "No token"});
    }
};

function getUserIDFromToken(token) {
    logindata = jwt.verify(token, secretSash.secret);

    return logindata.userID;
}
module.exports = {
    checkToken:checkToken,
    getUserIDFromToken: getUserIDFromToken
};