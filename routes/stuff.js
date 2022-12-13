const express = require("express");
const router = express.Router();

const auth = require("./middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtl = require("../controllers/stuff");

router.get("/", auth, stuffCtl.getAllStuff);
router.post("/", auth, multer, stuffCtl.createThing);
router.get("/:id", auth, stuffCtl.getOneStuff);
router.put("/:id", auth, multer, stuffCtl.updateOneStuff);
router.delete("/:id", auth, stuffCtl.deleteOneStuff);

module.exports = router;
