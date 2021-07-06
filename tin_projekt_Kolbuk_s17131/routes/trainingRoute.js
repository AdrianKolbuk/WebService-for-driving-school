const express = require('express');
const router = express.Router();
const trainingControler = require('../controllers/trainingController');
const authUtils = require('../util/authUtils');

router.get('/', authUtils.permitAuthenticatedUser, trainingControler.showTrainingList);
router.get('/add', authUtils.permitAuthenticatedUser, trainingControler.showAddTrainingForm);
router.get('/details/:trainingId', authUtils.permitAuthenticatedUser, trainingControler.showTrainingDetails);
router.get('/edit/:trainingId', authUtils.permitAuthenticatedUser, trainingControler.showEditTrainingForm);
router.post('/add', authUtils.permitAuthenticatedUser, trainingControler.addTraining);
router.post('/edit', authUtils.permitAuthenticatedUser, trainingControler.updateTraining);
router.get('/delete/:trainingId', authUtils.permitAuthenticatedUser, trainingControler.deleteTraining);

module.exports = router;