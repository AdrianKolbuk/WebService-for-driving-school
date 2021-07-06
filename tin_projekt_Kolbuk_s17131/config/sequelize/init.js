const sequelize = require('./sequelize');

const Employee = require('../../model/sequelize/Employee');
const Training = require('../../model/sequelize/Training');
const TrainingHistory = require('../../model/sequelize/TrainingHistory');
const authUtil = require('../../util/authUtils');

module.exports = () => {
    Employee.hasMany(TrainingHistory, { as: 'trainingHistory', foreignKey: { name: 'employee_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    TrainingHistory.belongsTo(Employee, { as: 'employee', foreignKey: { name: 'employee_id', allowNull: false } });
    Training.hasMany(TrainingHistory, { as: 'trainingHistory', foreignKey: { name: 'training_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    TrainingHistory.belongsTo(Training, { as: 'training', foreignKey: { name: 'training_id', allowNull: false } });
    // Warto zauważyć, że zastosowana została sekwencja promes - standardowy sposób w NodeJS na łączenie ze sobą złożonych operacji (takich jak zapytanie do bazy)    
    // operacja1()
    // .then( (wynikOperacji1) => {
    //     return operacja2();       
    //   })
    //   .then( (wynikOperacji2) => {
    //     //...
    //   })
    let allEmps, allTrainings;
    let trainingHistory;

    return sequelize
        .sync({ force: true })
        .then(() => {
            return Employee.findAll();
        })
        .then(emps => {
            if (!emps || emps.length == 0) {
                return Employee.bulkCreate([
                    { firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@zetka.com', phone: '+48601222042', salary: 5000, bonus: 20, category: 'B', expDate: '2030-09-20', permisson: 1, password: authUtil.hashPassword('12345') },
                    { firstName: 'Adam', lastName: 'Zieliński', email: 'adam.zielinski@zetka.com', phone: '+48601222043', salary: 4500, bonus: 15, category: 'A', expDate: '2030-09-21', permisson: 1, password: authUtil.hashPassword('qwerty') },
                    { firstName: 'Marian', lastName: 'Nowak', email: 'marian.nowak@zetka.com', phone: '+48601222044', salary: 5500, bonus: 25, category: 'B', expDate: '2030-09-22', permisson: 0, password: authUtil.hashPassword('123qwe') },
                ])
                    .then(() => {
                        return Employee.findAll();
                    });
            } else {
                return emps;
            }
        })
        .then(emps => {
            allEmps = emps;
            return Training.findAll();
        })
        .then(trainings => {
            if (!trainings || trainings.length == 0) {
                return Training.bulkCreate([
                    { trainingType: 'Nauka driftu', duration: 1, level: 1, price: 150 },
                    { trainingType: 'Jazda torowa', duration: 2, level: 2, price: 200 }
                ])
                    .then(() => {
                        return Employee.findAll();
                    });
            } else {
                return trainings;
            }
        })
        .then(trainings => {
            allTrainings = trainings;
            return TrainingHistory.findAll();
        })
        .then(history => {
            if (!history || history.length == 0) {
                return TrainingHistory.bulkCreate([
                    { employee_id: allEmps[0]._id, training_id: allTrainings[0]._id, dateFrom: '2009-01-01', dateTo: '2009-01-01', opinion: null },
                    { employee_id: allEmps[1]._id, training_id: allTrainings[0]._id, dateFrom: '2009-02-01', dateTo: '2009-02-02', opinion: null },
                    { employee_id: allEmps[0]._id, training_id: allTrainings[1]._id, dateFrom: '2009-01-02', dateTo: '2009-01-03', opinion: null }
                ]);
            } else {
                return history;
            }
        });
};