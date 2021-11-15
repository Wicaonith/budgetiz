module.exports = (sequelize, Sequelize) => {
    const Undersection = sequelize.define("bud_undersections", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        section: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        inTab: {
            type: Sequelize.BOOLEAN
        }
    });

    return Undersection;
};