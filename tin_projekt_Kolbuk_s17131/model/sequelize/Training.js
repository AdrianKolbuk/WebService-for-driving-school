const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Training = sequelize.define('Training', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    trainingType: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            notNull: {
                msg: "Pole jest wymagane"
            },
            // len: {
            //     args: [2,60],
            //     msg: "Pole powinno zawierać od 2 do 64 znaków"
            // },
        }
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 1, msg: "Pole powinno być liczbą od 1 do 3" },
            max: { args: 3, msg: "Pole powinno być liczbą od 1 do 3" },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 1, msg: "Pole powinno być liczbą od 1 do 3" },
            max: { args: 3, msg: "Pole powinno być liczbą od 1 do 3" },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 100, msg: "Pole powinno być liczbą od 100 do 500" },
            max: { args: 500, msg: "Pole powinno być liczbą od 100 do 500" },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            },
        }
    }

});

module.exports = Training;