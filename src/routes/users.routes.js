const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { checkRole } = require('../middlewares/auth.middleware'); //NO EXISTE AÚN


// Ver y actualizar perfil del usuario (autenticado)
router.get('/profile', usersController.getUser);
router.put('/profile', usersController.putUser);

// Admin: gestión usuarios
router.get('/', checkRole('admin'), usersController.getUsers);
router.delete('/:id', checkRole('admin'), usersController.deleteUser);

module.exports = router;