const Employee = require("../../model/sequelize/Employee");
const TrainingHistory = require("../../model/sequelize/TrainingHistory");
const Training = require("../../model/sequelize/Training");

exports.getEmployees = () => {
    return Employee.findAll();
};

exports.getEmployeeById = (empId) => {
    return Employee.findByPk(empId,
        {
            include: [{
                model: TrainingHistory,
                as: 'trainingHistory',
                include: [{
                    model: Training,
                    as: 'training'
                }]
            }]
        });
};

exports.createEmployee = (newEmpData) => {
    return Employee.create({
        firstName: newEmpData.firstName,
        lastName: newEmpData.lastName,
        email: newEmpData.email,
        phone: newEmpData.phone,
        salary: newEmpData.salary,
        bonus: newEmpData.bonus,
        category: newEmpData.category,
        expDate: newEmpData.expDate,
        permisson: newEmpData.permisson,
        password: newEmpData.password,
        confirmPassword: newEmpData.confirmPassword,
        role: newEmpData.role
    });
};

exports.updateEmployee = (empId, empData) => {
    const firstName = empData.firstName;
    const lastName = empData.lastName;
    const email = empData.email;
    const phone = empData.phone;
    const salary = empData.salary;
    const bonus = empData.bonus;
    const category = empData.category;
    const expDate = empData.expDate;
    const permisson = empData.permisson;
    return Employee.update(empData, { where: { _id: empId } });
};

exports.deleteEmployee = (empId) => {
    return Employee.destroy({
        where: { _id: empId }
    });

};

exports.findByEmail = (email) => {
    return Employee.findOne({
        where: { email: email }
    });
}