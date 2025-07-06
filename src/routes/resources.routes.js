const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const { checkRole } = require('../middlewares/checkRole'); //Aún no existe

// Listar recursos (para cualquier usuario autenticado)
router.get('/', resourcesController.getAllResourcesController);
router.get('/:id', resourcesController.getResourcesByUserIdController);

// Crear, actualizar, borrar recursos (MW para comprobar que el usuario sea el propietario)
router.post('/', resourcesController.createResourceController);
router.put('/:id', resourcesController.updateResourceByIdController);
router.delete('/:id', resourcesController.deleteResourceByIdController);

module.exports = router;