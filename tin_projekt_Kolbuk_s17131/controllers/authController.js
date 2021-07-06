const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    EmployeeRepository.findByEmail(email)
        .then(emp => {
            if (!emp) {
                res.render('pages/index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (authUtil.comparePasswords(password, emp.password) === true) {
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('pages/index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}