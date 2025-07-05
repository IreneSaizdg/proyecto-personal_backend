const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const { checkRole } = require('../middlewares/auth.middleware'); //Aún no existe

// Listar recursos (para cualquier usuario autenticado)
router.get('/', resourcesController.getAllResources);
router.get('/:id', resourcesController.getResourcesByUserId);

// Crear, actualizar, borrar recursos (MW para comprobar que el usuario sea el propietario)
router.post('/', resourcesController.createResource);
router.put('/:id', resourcesController.updateResourceById);
router.delete('/:id', resourcesController.deleteResourceById);

module.exports = router;