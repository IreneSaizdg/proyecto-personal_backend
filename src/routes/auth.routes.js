// IMPORTS
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/auth.controller');



// RUTAS DE AUTENTICACIÓN (Firebase)
// POST http://localhost:5000/api/v1/auth/register
router.post('/register', usersController.register); 

// POST http://localhost:5000/api/v1/auth/login
router.post('/login', usersController.login); 



// EXPORTS
module.exports = router;