const express = require('express');
const router = express.Router();
const trainingHistoryControler = require('../controllers/trainingHistoryController');

router.get('/', trainingHistoryControler.showTrainingHistoryList);
router.get('/add', trainingHistoryControler.showAddTrainingHistoryForm);
router.get('/details/:trainingHistoryId', trainingHistoryControler.showTrainingHistoryDetails);
router.get('/edit/:trainingHistoryId', trainingHistoryControler.showEditTrainingHistoryForm);
router.post('/add', trainingHistoryControler.addTrainingHistory);
router.post('/edit', trainingHistoryControler.updateTrainingHistory);
router.get('/delete/:trainingHistoryId', trainingHistoryControler.deleteTrainingHistory);


module.exports = router;