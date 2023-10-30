const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:useId")
    .delete(controller.delete)
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;