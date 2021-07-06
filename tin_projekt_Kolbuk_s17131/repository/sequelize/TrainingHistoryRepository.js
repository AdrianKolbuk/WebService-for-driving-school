const Sequelize = require('sequelize');

const TrainingHistory = require('../../model/sequelize/TrainingHistory');
const Employee = require('../../model/sequelize/Employee');
const Training = require('../../model/sequelize/Training');

exports.getTrainingHistory = () => {
    return TrainingHistory.findAll({
        include: [
            {
                model: Employee,
                as: 'employee'
            },
            {
                model: Training,
                as: 'training'
            }]
    });
};


exports.getTrainingHistoryById = (trainingHistoryId) => {
    return TrainingHistory.findByPk(trainingHistoryId, {
        include: [
            {
                model: Employee,
                as: 'employee'
            },
            {
                model: Training,
                as: 'training'
            }]
    });
};

exports.createTrainingHistory = (data) => {
    console.log(JSON.stringify(data));

    return TrainingHistory.create({
        employee_id: data.employee_id,
        training_id: data.training_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        opinion: data.opinion
    });
};

exports.updateTrainingHistory = (trainingHistoryId, data) => {
    return TrainingHistory.update(data, { where: { _id: trainingHistoryId } });
}

exports.deleteTrainingHistory = (trainingHistoryId) => {
    return TrainingHistory.destroy({
        where: { _id: trainingHistoryId }
    });
}

exports.deleteManyTrainingHistory = (trainingHistoryIds) => {
    return TrainingHistory.find({ _id: { [Sequelize.Op.in]: trainingHistoryIds } })
}