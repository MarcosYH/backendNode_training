const express = require("express");
const router = express.Router();

const multer = require("../middlewares/multer-config")

const auth = require('../middlewares/auth');

const stuffControlers = require("../controllers/stuff");

router.post("/", auth, multer, stuffControlers.createThing);

router.get("/:id", auth, stuffControlers.getOneThing);

router.put("/:id", auth, multer, stuffControlers.putOneThing);

router.delete("/:id", auth, stuffControlers.deleteOneThing);

router.get("/", auth, stuffControlers.getAllThing);

module.exports = router;
