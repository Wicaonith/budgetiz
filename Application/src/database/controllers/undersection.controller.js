const db = require("../models");
const Undersection = db.undersection;
const Op = db.Sequelize.Op;

// Create and Save a new Undersection
exports.createUndersection = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Undersection
    const undersection = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type
    };

    // Save Undersection in the database
    Undersection.create(undersection)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Undersection."
            });
        });
};

// Retrieve all Undersection from the database.
exports.readUndersections = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Undersection.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Undersection."
            });
        });
};

// Find a single Undersection with an id
exports.readUndersection = (req, res) => {
    const id = req.params.id;

    Undersection.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Undersection with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Undersection with id=" + id
            });
        });
};

// Update a Undersection by the id in the request
exports.updateUndersection = (req, res) => {
    const id = req.params.id;

    Undersection.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Undersection was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Undersection with id=${id}. Maybe Undersection was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Undersection with id=" + id
            });
        });
};

// Delete a Undersection with the specified id in the request
exports.deleteUndersection = (req, res) => {
    const id = req.params.id;

    Undersection.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Undersection was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Undersection with id=${id}. Maybe Undersection was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Undersection with id=" + id
            });
        });
};

// Delete all Undersection from the database.
exports.deleteUndersections = (req, res) => {
    Undersection.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Undersection were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Undersection."
            });
        });
};

exports.isExist = (id) => {
    Undersection.findOne({
        where: { id }
    })
        .then(token => token !== null)
        .then(isUnique => isUnique);
};