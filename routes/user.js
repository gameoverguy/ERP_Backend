const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/index");
const router = express.Router();

router.get("/", userController.index);
router.post("/addUser", userController.addUser);
router.post("/authenticate", userController.authenticate);
router.get("/verifyToken", verifyToken, userController.validateToken);
router.put("/:userId/password", userController.updatePassword); //Request body: { "oldPassword": "123456", "newPassword": "newpass123" }
router.put("/:userId", userController.updateUserFields); //Request body (Example): { "firstName": "John", "address": "New York" }
router.delete("/:userId", userController.deleteUser);

module.exports = router;
