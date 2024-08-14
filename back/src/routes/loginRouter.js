const {Router} = require('express')
const router = Router();

const { login, getId } = require('../controller/loginController');

router.post('/login', login);
router.get('/login/id', getId);

module.exports = router;