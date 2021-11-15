module.exports = app => {
    const section = require("../controllers/section.controller.js");

    var router = require("express").Router();

    // Create a new Section
    router.post("/", section.createSection);

    // Retrieve all Section
    router.get("/", section.readSections);

    // Retrieve a single Section with id
    router.get("/:id", section.readSection);

    // Update a Section with id
    router.put("/:id", section.updateSection);

    // Delete a Section with id
    router.delete("/:id", section.deleteSection);

    // Delete all Section
    router.delete("/", section.deleteSections);

    app.use('/api/section', router);
};