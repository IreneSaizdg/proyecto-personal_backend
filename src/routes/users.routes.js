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
// POST: http://localhost:5000/api/v1/users
router.post('/', createUserController);

// RUTA: 2. Ver todos los usuarios (admin)
// GET: http://localhost:5000/api/v1/users
router.get('/', getUsersController);

// RUTA: 3. Eliminar usuario por ID (admin)
// DELETE: http://localhost:5000/api/v1/users
router.delete('/:id', deleteUserByIdController);

// RUTA: 4. Ver usuario por ID (perfil de usuario autenticado)
// GET: http://localhost:5000/api/v1/users/1
router.get('/:id', getUserByIdController);

// RUTA: 5. Editar usuario por ID (perfil usuario autenticado)
// PUT: http://localhost:5000/api/v1/users/5
router.put('/:user_id', putUserByIdController);








// EXPORTS
module.exports = router;