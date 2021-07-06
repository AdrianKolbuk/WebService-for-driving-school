const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define('Employee', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 32],
                msg: "Pole powinno zawierać od 2 do 32 znaków"
            },
        },
    },
    lastName: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 32],
                msg: "Pole powinno zawierać od 2 do 32 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email"
            }
        }
    },
    phone: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [12, 12],
                msg: "np. +48xxxxxxxxx"
            },
        }
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 2000, msg: "Pole powinno być liczbą od 2000 do 1 000 000" },
            max: { args: 1000000, msg: "Pole powinno być liczbą od 2000 do 1 000 000" },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 1, msg: "Pole powinno być liczbą od 1 do 30" },
            max: { args: 30, msg: "Pole powinno być liczbą od 1 do 30" },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    category: {
        type: Sequelize.STRING(32),
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
    expDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
        }
    },
    permisson: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        validate: {
            min: 0,
            max: 1,
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            notNull: {
                msg: "Pole jest wymagane"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 256],
                msg: "hasło musi zawierać min. 5 znaków"
            },
        }
    },
    confirmPassword: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isEqual() {
                if (this.confirmPassword != this.password) {
                    throw new Error("Hasła nie są takie same");
                }
            },
        }
    }
});



module.exports = Employee;