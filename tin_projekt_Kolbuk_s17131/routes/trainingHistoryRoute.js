const express = require('express');
const router = express.Router();
const trainingHistoryControler = require('../controllers/trainingHistoryController');
const authUtils = require('../util/authUtils');

router.get('/', authUtils.permitAuthenticatedUser, trainingHistoryControler.showTrainingHistoryList);
router.get('/add', authUtils.permitAuthenticatedUser, trainingHistoryControler.showAddTrainingHistoryForm);
router.get('/details/:trainingHistoryId', authUtils.permitAuthenticatedUser, trainingHistoryControler.showTrainingHistoryDetails);
router.get('/edit/:trainingHistoryId', authUtils.permitAuthenticatedUser, trainingHistoryControler.showEditTrainingHistoryForm);
router.post('/add', authUtils.permitAuthenticatedUser, trainingHistoryControler.addTrainingHistory);
router.post('/edit', authUtils.permitAuthenticatedUser, trainingHistoryControler.updateTrainingHistory);
router.get('/delete/:trainingHistoryId', authUtils.permitAuthenticatedUser, trainingHistoryControler.deleteTrainingHistory);


module.exports = router;