const bcrypt = require("bcryptjs");
const validateUserInput = (email, password) => {
    return email && password;
}

const comparePassword = (password, hashedPasswords) => {
    return bcrypt.compareSync(password, hashedPasswords);

}
module.exports = { validateUserInput,comparePassword }; 