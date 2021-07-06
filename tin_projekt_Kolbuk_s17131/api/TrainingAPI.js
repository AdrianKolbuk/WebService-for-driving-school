const TrainingRepository = require('../repository/sequelize/TrainingRepository');

exports.getTrainings = (req, res, next) => {
    TrainingRepository.getTrainings()
        .then(trainings => {
            res.status(200).json(trainings);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTrainingById = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.getTrainingById(trainingId)
        .then(training => {
            if (!training) {
                res.status(404).json({
                    message: 'Training with id: ' + trainingId + ' not found'
                })
            } else {
                res.status(200).json(training);
            }
        });
};

exports.createTraining = (req, res, next) => {
    TrainingRepository.createTraining(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateTraining = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.updateTraining(trainingId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Training updated!', training: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTraining = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.deleteTraining(trainingId)
        .then(result => {
            res.status(200).json({ message: 'Removed Training', training: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};