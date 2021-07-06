const TrainingRepository = require('../repository/sequelize/TrainingRepository');


exports.showTrainingList = (req, res, next) => {
    TrainingRepository.getTrainings()
        .then(trainings => {
            res.render('pages/training/list', {
                trainings: trainings,
                navLocation: 'training',
                validationErrors: []
            });
        });
}

exports.showAddTrainingForm = (req, res, next) => {
    res.render('pages/training/form', {
        training: {},
        pageTitle: req.__('training.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('training.form.add.btnLabel'),
        formAction: '/trainings/add',
        navLocation: 'training',
        validationErrors: []
    });
}

exports.showTrainingDetails = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.getTrainingById(trainingId)
        .then(training => {
            res.render('pages/training/form', {
                training: training,
                pageTitle: req.__('training.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'training',
                validationErrors: []
            });
        });
}

exports.showEditTrainingForm = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.getTrainingById(trainingId)
        .then(training => {
            res.render('pages/training/form', {
                training: training,
                pageTitle: req.__('training.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('training.form.edit.btnLabel'),
                formAction: '/trainings/edit',
                navLocation: 'training',
                validationErrors: []
            });
        });
}

exports.addTraining = (req, res, next) => {
    const trainingData = { ...req.body };

    TrainingRepository.createTraining(req.body)
        .then(() => res.redirect('/trainings'))
        .catch(err => {
            let errors = err.errors;
            res.render('pages/training/form', {
                training: req.body,
                pageTitle: req.__('training.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('training.form.add.btnLabel'),
                formAction: '/trainings/add',
                navLocation: 'training',
                validationErrors: errors
            });
        });
};

exports.updateTraining = (req, res, next) => {
    const trainingId = req.body._id;
    const trainingData = { ...req.body };

    let errors;
    TrainingRepository.updateTraining(trainingId, trainingData)
        .then(() => res.redirect('/trainings'))
        .catch(err => {
            errors = err.errors;
            return TrainingRepository.getTrainingById(trainingId);
        })
        .then(training => {
            res.render('pages/training/form', {
                training: { ...req.body, trainingHistory: training.trainingHistory },
                pageTitle: req.__('training.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('training.form.add.btnLabel'),
                formAction: '/trainings/edit',
                navLocation: 'training',
                validationErrors: errors
            });
        });
};

exports.deleteTraining = (req, res, next) => {
    const trainingId = req.params.trainingId;
    TrainingRepository.deleteTraining(trainingId)
        .then(() => {
            res.redirect('/trainings');
        });
};