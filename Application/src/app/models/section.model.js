module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("bud_sections", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });

    return Section;
};