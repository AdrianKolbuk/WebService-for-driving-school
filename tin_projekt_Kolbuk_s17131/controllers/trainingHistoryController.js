const TrainingHistoryRepository = require('../repository/sequelize/TrainingHistoryRepository');
const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const TrainingRepository = require('../repository/sequelize/TrainingRepository');

exports.showTrainingHistoryList = (req, res, next) => {
    TrainingHistoryRepository.getTrainingHistory()
        .then(trainingHistory => {
            res.render('pages/trainingHistory/list', {
                trainingHistory: trainingHistory,
                formMode: '',
                navLocation: 'history',
                validationErrors: []
            });
        });
}

exports.showAddTrainingHistoryForm = (req, res, next) => {

    let allEmps, allTrainings;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return TrainingRepository.getTrainings();
        })
        .then(trainings => {
            allTrainings = trainings;
            res.render('pages/trainingHistory/form', {
                history: {},
                allEmps: allEmps,
                allTrainings: allTrainings,
                formMode: 'createNew',
                pageTitle: req.__('history.form.add.pageTitle'),
                btnLabel: req.__('history.form.add.btnLabel'),
                formAction: '/history/add',
                navLocation: 'history',
                validationErrors: []
            });
        });
}

exports.showTrainingHistoryDetails = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;

    let allEmps, allTrainings;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return TrainingRepository.getTrainings();
        })
        .then(trainings => {
            allTrainings = trainings;
            return TrainingHistoryRepository.getTrainingHistoryById(trainingHistoryId);
        })
        .then(history => {
            res.render('pages/trainingHistory/form', {
                history: history,
                pageTitle: req.__('history.form.details.pageTitle'),
                allEmps: allEmps,
                allTrainings: allTrainings,
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'history',
                validationErrors: []
            });
        });
}

exports.showEditTrainingHistoryForm = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;

    let allEmps, allTrainings;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return TrainingRepository.getTrainings();
        })
        .then(trainings => {
            allTrainings = trainings;
            return TrainingHistoryRepository.getTrainingHistoryById(trainingHistoryId);
        })
        .then(history => {
            res.render('pages/trainingHistory/form', {
                history: history,
                pageTitle: req.__('history.form.edit.pageTitle'),
                allEmps: allEmps,
                allTrainings: allTrainings,
                formMode: 'edit',
                btnLabel: req.__('history.form.edit.btnLabel'),
                formAction: '/history/edit',
                navLocation: 'history',
                validationErrors: []
            });
        });
}

exports.addTrainingHistory = (req, res, next) => {
    const trainingHistoryData = { ...req.body };

    let allEmps, allTrainings;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return TrainingRepository.getTrainings();
        })
        .then(trainings => {
            allTrainings = trainings;
            return TrainingHistoryRepository.createTrainingHistory(trainingHistoryData);
        })
        .then(result => {
            res.redirect('/history');
        })
        .catch(err => {
            res.render('pages/trainingHistory/form', {
                history: trainingHistoryData,
                pageTitle: req.__('history.form.add.pageTitle'),
                allEmps: allEmps,
                allTrainings: allTrainings,
                formMode: 'createNew',
                btnLabel: req.__('history.form.add.btnLabel'),
                formAction: '/history/add',
                navLocation: 'history',
                validationErrors: err.errors
            });
        });
};

exports.updateTrainingHistory = (req, res, next) => {
    const trainingHistoryId = req.body._id;
    const trainingHistoryData = { ...req.body };

    let allEmps, allTrainings;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return TrainingRepository.getTrainings();
        })
        .then(trainings => {
            allTrainings = trainings;
            return TrainingHistoryRepository.updateTrainingHistory(trainingHistoryId, req.body);
        })
        .then(() => {
            res.redirect('/history');
        })
        .catch(err => {
            res.render('pages/trainingHistory/form', {
                history: req.body,
                pageTitle: req.__('history.form.edit.pageTitle'),
                allEmps: allEmps,
                allTrainings: allTrainings,
                formMode: 'edit',
                btnLabel: req.__('history.form.edit.btnLabel'),
                formAction: '/history/edit',
                navLocation: 'history',
                validationErrors: err.errors
            });
        });

};

exports.deleteTrainingHistory = (req, res, next) => {
    const trainingHistoryId = req.params.trainingHistoryId;
    TrainingHistoryRepository.deleteTrainingHistory(trainingHistoryId)
        .then(() => {
            res.redirect('/history');
        });
};