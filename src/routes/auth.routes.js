const express = require('express');
const router = express.Router();

// Controladores
const usersController = require('../controllers/users.controller');

// RUTAS DE AUTENTICACIÓN (Firebase)
// POST /api/v1/auth/register
router.post('/register', usersController.register); 

// POST /api/v1/auth/login
router.post('/login', usersController.login); 

module.exports = router;