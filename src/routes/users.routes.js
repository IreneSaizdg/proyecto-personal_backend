// IMPORTS
const express = require('express');
const router = express.Router();
const {
    createUserController,
    getUsersController,
    getUserByIdController,
    putUserByIdController,
    deleteUserByIdController,   
} = require('../controllers/users.controller');



// RUTA: 1. Crear usuario (admin)
router.post('/', createUserController);

// RUTA: 2. Ver todos los usuarios (admin)
router.get('/', getUsersController);

// RUTA: 3. Eliminar usuario por ID (admin)
router.delete('/:id', deleteUserByIdController);

// RUTA: 4. Ver usuario por ID (perfil de usuario autenticado)
router.get('/:id', getUserByIdController);

// RUTA: 5. Editar usuario por ID (perfil usuario autenticado)
router.put('/:user_id', putUserByIdController);








// EXPORTS
module.exports = router;