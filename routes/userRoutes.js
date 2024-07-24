const express = require('express');
const userController = require('../controllers/userController')


const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.authenticateUser);
router.get('/viewProfile/:id',userController.getUser);
router.put('/updateProfile/:id',userController.updateUser); 

module.exports = router;