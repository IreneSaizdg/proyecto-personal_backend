const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favourites.controller');

// Añadir favorito
router.post('/', favouritesController.addFavouriteController);

// Eliminar favorito por resourceId
router.delete('/:resourceId', favouritesController.deleteFavouriteByIdController);

// Obtener favoritos del usuario autenticado
router.get('/', favouritesController.getFavouritesByUserIdController);

module.exports = router;