const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/userController');


//----------------------------- User's API -----------------------------//

router.post('/signup', signUp);
router.post('/login', login);




//----------------------------- For invalid end URL -----------------------------//

router.all('/**', function (_, res) {
    return res.status(400).send({ status: false, message: "Invalid http request" });
})


module.exports = router; 