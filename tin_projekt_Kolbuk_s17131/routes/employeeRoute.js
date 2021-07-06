const express = require('express');
const router = express.Router();

const employeeControler = require('../controllers/employeeController');
const authUtils = require('../util/authUtils');

router.get('/', authUtils.permitAuthenticatedUser, employeeControler.showEmployeeList);
router.get('/add', authUtils.permitAuthenticatedUser, employeeControler.showAddEmployeeForm);
router.get('/edit/:empId', authUtils.permitAuthenticatedUser, employeeControler.showEditEmployeeForm);
router.get('/details/:empId', authUtils.permitAuthenticatedUser, employeeControler.showEmployeeDetails);
router.post('/add', authUtils.permitAuthenticatedUser, employeeControler.addEmployee);
router.post('/edit', authUtils.permitAuthenticatedUser, employeeControler.updateEmployee);
router.get('/delete/:empId', authUtils.permitAuthenticatedUser, employeeControler.deleteEmployee);

module.exports = router;