const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');


const TrainingHistory = sequelize.define('TrainingHistory', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            notNull: {
                msg: "Pole jest wymagane"
            },
        }
    },
    training_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            notNull: {
                msg: "Pole jest wymagane"
            },
        }
    },
    dateFrom: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            isSameOrBefore(reqDate) {
                const today = new Date();
                const date = new Date(reqDate);
                if (date > today)
                    throw new Error("Data nie może być z przyszłości");
                msg: "Data nie może być z przyszłości"
            },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
        }
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isSameOrBefore(reqDate) {
                const today = new Date();
                const date = new Date(reqDate);
                if (date > today)
                    throw new Error("Data nie może być z przyszłości");
                msg: "Data nie może być z przyszłości"
            },
            isSameOrAfter(reqDate) {
                const date = new Date(reqDate);
                const dateFrom = new Date(this.dateFrom);
                if (date < dateFrom && reqDate != null)
                    throw new Error("Data do nie może być przed datą od");
                msg: "Data do nie może być przed datą od"
            },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
        }
    },
    opinion: {
        type: Sequelize.STRING(256),
        allowNull: true,
        validate: {
            len: {
                args: [0, 256],
                msg: "Pole powinno zawierać do 256 znaków"
            },
        }
    },

});

module.exports = TrainingHistory;