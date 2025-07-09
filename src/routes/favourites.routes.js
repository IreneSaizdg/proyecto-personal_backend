// IMPORTS
const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favourites.controller');



// RUTA: 1. Añadir favorito
router.post('/', favouritesController.addFavouriteController);

// RUTA: 2. Obtener favoritos del usuario autenticado
router.get('/', favouritesController.getFavouritesByUserIdController);

// RUTA: 3. Eliminar favorito por resourceId
router.delete('/:resourceId', favouritesController.deleteFavouriteByIdController);





// EXPORTS
module.exports = router;