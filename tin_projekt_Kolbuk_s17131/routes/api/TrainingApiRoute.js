const express = require('express');
const router = express.Router();

const trainingApiController = require('../../api/TrainingAPI');

router.get('/', trainingApiController.getTrainings);
router.get('/:trainingId', trainingApiController.getTrainingById);
router.post('/', trainingApiController.createTraining);
router.put('/:trainingId', trainingApiController.updateTraining);
router.delete('/:trainingId', trainingApiController.deleteTraining);

module.exports = router;