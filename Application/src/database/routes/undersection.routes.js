module.exports = app => {
    const undersection = require("../controllers/undersection.controller.js");

    var router = require("express").Router();

    // Create a new Undersection
    router.post("/", undersection.createUndersection);

    // Retrieve all Undersection
    router.get("/", undersection.readUndersections);

    // Retrieve a single Undersection with id
    router.get("/:id", undersection.readUndersection);

    // Update a Undersection with id
    router.put("/:id", undersection.updateUndersection);

    // Delete a Undersection with id
    router.delete("/:id", undersection.deleteUndersection);

    // Delete all Undersection
    router.delete("/", undersection.deleteUndersections);

    // Update a Undersection with id
    router.get("/exist/:id", undersection.isExist);

    app.use('/api/undersection', router);
};