var express = require('express');
var router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const AuthController = require('../controllers/authController');
const langController = require('../controllers/langController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { navLocation: 'main' });
});

router.post('/login', AuthController.login);
router.post('/register', EmployeeController.registerEmployee);
router.get('/register', EmployeeController.showRegisterEmployeeForm);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', langController.changeLang);

module.exports = router;
