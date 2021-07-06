const express = require('express');
const router = express.Router();

const trainingHistoryApiController = require('../../api/TrainingHistoryAPI');

router.get('/', trainingHistoryApiController.getTrainingsHistory);
router.get('/:trainingHistoryId', trainingHistoryApiController.getTrainingHistoryById);
router.post('/', trainingHistoryApiController.createTrainingHistory);
router.put('/:trainingHistoryId', trainingHistoryApiController.updateTrainingHistory);
router.delete('/:trainingHistoryId', trainingHistoryApiController.deleteTrainingHistory);

module.exports = router;