const express = require("express");
const {addMenuItem, updateMenuItem, getAllMenuItems } = require("../controllers/menuController");
const router = express.Router();

router.get("/", getAllMenuItems);
router.post("/", addMenuItem);
router.patch('/:id', updateMenuItem);


module.exports = router;
