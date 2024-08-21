const { Router } = require("express");
const router = Router();

const { logIn } = require("../controller/loginController");

// POST

router.post("/verif/logIn", logIn);

module.exports = router;