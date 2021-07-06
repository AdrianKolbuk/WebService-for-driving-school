const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const authUtil = require('../util/authUtils');

exports.showEmployeeList = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp',
                validationErrors: []
            });
        });
}

exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form', {
        emp: {},
        pageTitle: req.__('emp.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('emp.form.add.btnLabel'),
        formAction: '/employees/add',
        navLocation: 'emp',
        validationErrors: []
    });
}

exports.showEmployeeDetails = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'showDetails',
                pageTitle: req.__('emp.form.details.pageTitle'),
                formAction: '',
                navLocation: 'emp',
                validationErrors: []
            });
        });
}

exports.showEditEmployeeForm = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: req.__('emp.form.edit.pageTitle'),
                btnLabel: req.__('emp.form.edit.btnLabel'),
                formAction: '/employees/edit',
                navLocation: 'emp',
                validationErrors: []
            });
        });
};


exports.addEmployee = (req, res, next) => {
    const empData = { ...req.body };
    req.body.password = authUtil.hashPassword(req.body.password);
    // EmployeeRepository.createEmployee(empData)
    //     .then(result => {
    //         res.redirect('/employees');
    //     })
    //     .catch(err => {
    //         res.render('pages/employee/form', {
    //             emp: empData,
    //             pageTitle: 'Dodawanie pracownika',
    //             formMode: 'createNew',
    //             btnLabel: 'Dodaj pracownika',
    //             formAction: '/employees/add',
    //             navLocation: 'emp',
    //             validationErrors: err.errors
    //         });
    //     });

    EmployeeRepository.createEmployee(req.body)
        .then(() => res.redirect('/employees'))
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
                if (e.path.includes('phone') && e.type === 'unique violation') {
                    e.message = "Podany numer telefonu jest już używany";
                }
            });
            res.render('pages/employee/form', {
                emp: req.body,
                pageTitle: req.__('emp.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('emp.form.add.btnLabel'),
                formAction: '/employees/add',
                navLocation: 'emp',
                validationErrors: errors
            });
        });
};

exports.updateEmployee = (req, res, next) => {

    const empId = req.body._id;
    const empData = { ...req.body };
    req.body.password = authUtil.hashPassword(req.body.password);

    EmployeeRepository.updateEmployee(empId, empData)
        .then(() => res.redirect('/employees'))
        .catch(err => {
            let errors = err.errors;
            errors.forEach(e => {
                if (e.path.includes('email') && e.type === 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
                if (e.path.includes('phone') && e.type === 'unique violation') {
                    e.message = "Podany numer telefonu jest już używany";
                }
            });
            return EmployeeRepository.getEmployeeById(empId);
        })
        .then(emp => {
            res.render('pages/employee/form', {

                emp: { ...req.body, trainingHistory: emp.trainingHistory },
                pageTitle: req.__('emp.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('emp.form.edit.btnLabel'),
                formAction: '/employees/edit',
                navLocation: 'emp',
                validationErrors: errors
            });
        });
};

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.deleteEmployee(empId)
        .then(() => {
            res.redirect('/employees');
        });
};
