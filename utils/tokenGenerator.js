const jwt = require('jsonwebtoken');

module.exports.tokenGenerator = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, 'thisIsTheSecretKey');
}  