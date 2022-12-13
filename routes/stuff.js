const express = require("express");
const router = express.Router();
const stuffCtl = require("../controllers/stuff");
const auth = require("./middleware/auth");

router.post("/", auth, stuffCtl.createThing);
router.get("/", auth, stuffCtl.getAllStuff);
router.get("/:id", auth, stuffCtl.getOneStuff);
router.put("/:id", auth, stuffCtl.updateOneStuff);
router.delete("/:id", auth, stuffCtl.deleteOneStuff);

module.exports = router;
