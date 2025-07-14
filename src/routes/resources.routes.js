const express = require('express');
const router = express.Router();
const {
    getResourceByIdController,
    getAllResourcesController,
    getPublicResourcesController,
    getResourcesByUserIdController,
    searchResourcesByTagController,
    createResourceController,
    updateResourceByIdController,
    deleteResourceByIdController,
} = require('../controllers/resources.controller');


// RUTA: 0. Obtener recurso por id
// GET http://localhost:5000/api/v1/resources/1
router.get('/:resource_id', getResourceByIdController);

// RUTA: 1. Obtener todos los recursos 
// GET http://localhost:5000/api/v1/resources
router.get('/', getAllResourcesController);

// RUTA: 2. Obtener recursos públicos
// GET http://localhost:5000/api/v1/resources/public
router.get('/public', getPublicResourcesController);

// RUTA: 3. Obtener recursos por ID de usuario
// GET http://localhost:5000/api/v1/resources/user/1
router.get('/user/:user_id', getResourcesByUserIdController);

// RUTA: 4. Buscar recursos por tag
// GET http://localhost:5000/api/v1/resources/search/testing
router.get('/search/:tag', searchResourcesByTagController);

// RUTA: 5. Crear nuevo recurso
// POST http://localhost:5000/api/v1/resources
router.post('/', createResourceController);

// RUTA: 6. Editar recurso por ID
// PUT http://localhost:5000/api/v1/resources/7 
router.put('/:resource_id', updateResourceByIdController);

// RUTA: 7. Eliminar recurso por ID
// DELETE http://localhost:5000/api/v1/resources/1
router.delete('/:resource_id', deleteResourceByIdController);




// EXPORTS
module.exports = router;