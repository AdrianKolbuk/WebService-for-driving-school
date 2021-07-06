const TrainingHistoryRepository = require('../repository/sequelize/TrainingHistoryRepository');

exports.getTrainingsHistory = (req, res, next) => {
    TrainingHistoryRepository.getTrainingHistory()
        .then(trainingsHistory => {
            res.status(200).json(trainingsHistory);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTrainingHistoryById = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;
    TrainingHistoryRepository.getTrainingHistoryById(trainingHistoryId)
        .then(trainingHistory => {
            if (!trainingHistory) {
                res.status(404).json({
                    message: 'TrainingHistory with id: ' + trainingHistoryId + ' not found'
                })
            } else {
                res.status(200).json(trainingHistory);
            }
        });
};

exports.createTrainingHistory = (req, res, next) => {
    TrainingHistoryRepository.createTrainingHistory(req.body)
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

exports.updateTrainingHistory = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;
    TrainingHistoryRepository.updateTrainingHistory(trainingHistoryId, req.body)
        .then(result => {
            res.status(200).json({ message: 'TrainingHistory updated!', trainingHistory: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTrainingHistory = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;
    TrainingHistoryRepository.deleteTrainingHistory(trainingHistoryId)
        .then(result => {
            res.status(200).json({ message: 'Removed TrainingHistory', trainingHistory: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};