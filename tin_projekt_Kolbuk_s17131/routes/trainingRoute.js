const express = require('express');
const router = express.Router();

const trainingControler = require('../controllers/trainingController');
router.get('/', trainingControler.showTrainingList);
router.get('/add', trainingControler.showAddTrainingForm);
router.get('/details/:trainingId', trainingControler.showTrainingDetails);
router.get('/edit/:trainingId', trainingControler.showEditTrainingForm);
router.post('/add', trainingControler.addTraining);
router.post('/edit', trainingControler.updateTraining);
router.get('/delete/:trainingId', trainingControler.deleteTraining);

module.exports = router;