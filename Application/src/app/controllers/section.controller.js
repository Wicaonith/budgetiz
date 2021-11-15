const db = require("../models");
const Section = db.section;
const Op = db.Sequelize.Op;

// Create and Save a new Section
exports.createSection = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Section
    const section = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type
    };

    // Save Section in the database
    Section.create(section)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Section."
            });
        });
};

// Retrieve all Section from the database.
exports.readSections = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Section.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Section with an id
exports.readSection = (req, res) => {
    const id = req.params.id;

    Section.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Section with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Section with id=" + id
            });
        });
};

// Update a Section by the id in the request
exports.updateSection = (req, res) => {
    const id = req.params.id;

    Section.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Section was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Section with id=${id}. Maybe Section was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Section with id=" + id
            });
        });
};

// Delete a Section with the specified id in the request
exports.deleteSection = (req, res) => {
    const id = req.params.id;

    Section.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Section was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Section with id=${id}. Maybe Section was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Section with id=" + id
            });
        });
};

// Delete all Section from the database.
exports.deleteSections = (req, res) => {
    Section.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Section were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Section."
            });
        });
};