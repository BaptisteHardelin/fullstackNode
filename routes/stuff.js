const express = require("express");
const router = express.Router();
const stuffCtl = require("../controllers/stuff");

router.post("/", stuffCtl.createThing);
router.get("/", stuffCtl.getAllStuff);
router.get("/:id", stuffCtl.getOneStuff);
router.put("/:id", stuffCtl.updateOneStuff);
router.delete("/:id", stuffCtl.deleteOneStuff);

module.exports = router;
