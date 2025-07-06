const express = require('express');
const router = express.Router();
const {
    getAllResourcesController,
    getPublicResourcesController,
    getResourcesByUserIdController,
    searchResourcesByTagController,
    createResourceController,
    updateResourceByIdController,
    deleteResourceByIdController
} = require('../controllers/resources.controller');



// RUTA: 1. Obtener todos los recursos 
router.get('/', getAllResourcesController);

// RUTA: 2. Obtener recursos públicos
router.get('/public', getPublicResourcesController);

// RUTA: 3. Obtener recursos por ID de usuario
router.get('/user/:user_id', getResourcesByUserIdController);

// RUTA: 4. Buscar recursos por texto en tags
router.get('/search/:tag', searchResourcesByTagController);

// RUTA: 5. Crear nuevo recurso
router.post('/', createResourceController);

// RUTA: 6. Editar recurso por ID
router.put('/:resource_id', updateResourceByIdController);

// RUTA: 7. Eliminar recurso por ID
router.delete('/:resource_id', deleteResourceByIdController);




// EXPORTS
module.exports = router;