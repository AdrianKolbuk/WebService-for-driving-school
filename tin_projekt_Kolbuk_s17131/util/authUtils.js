const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;

    if (req.url.toString() === "/" || req.url.toString().includes("/details")) {
        next();
    } else {
        if (loggedUser) {
            next();
        } else {
            throw new Error('Unauthorized access, you need to log in in order to do that');
        }
    }
}

exports.allowAction = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    console.log("///////////" + loggedUser.role);
    var id = req.url.split('/')[2];
    console.log("//////////////   ID   /////////////////////" + id);
    console.log("user id: " + loggedUser._id)

    if (loggedUser.role === 'user') {
        if (loggedUser._id.toString() === id.toString()) {
            console.log("you are in");
            next();
        }
        else {
            throw new Error("You do not have permission to do that");
        }
    } else {
        next();
    }
}

exports.checkAdmin = (req, res, next) => {
    const loggedUser = req.session.loggedUser;

    if (loggedUser.role === 'admin') {
        next();
    } else {
        throw new Error("You do not have permission to do that");
    }
}