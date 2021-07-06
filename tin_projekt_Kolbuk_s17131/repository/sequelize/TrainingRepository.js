const Employee = require("../../model/sequelize/Employee");
const TrainingHistory = require("../../model/sequelize/TrainingHistory");
const Training = require("../../model/sequelize/Training");

exports.getTrainings = () => {
    return Training.findAll();
};

exports.getTrainingById = (trainingId) => {
    return Training.findByPk(trainingId,
        {
            include: [{
                model: TrainingHistory,
                as: 'trainingHistory',
                include: [{
                    model: Employee,
                    as: 'employee'
                }]
            }]
        });
};

exports.createTraining = (newTrainingData) => {
    return Training.create({
        trainingType: newTrainingData.trainingType,
        duration: newTrainingData.duration,
        level: newTrainingData.level,
        price: newTrainingData.price
    });
};

exports.updateTraining = (trainingId, trainingData) => {
    const trainingType = trainingData.trainingType;
    const duration = trainingData.duration;
    const level = trainingData.level;
    const price = trainingData.price;
    return Training.update(trainingData, { where: { _id: trainingId } });
};

exports.deleteTraining = (trainingId) => {
    return Training.destroy({
        where: { _id: trainingId }
    });

}; 