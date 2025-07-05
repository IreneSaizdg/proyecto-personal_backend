const express = require('express');
const router = express.Router();


// Importar subrutas
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const resourcesRoutes = require('./resources.routes');
const favouritesRoutes = require('./favourites.routes');

router.use('/auth', authRoutes);             // login y registro
router.use('/users', usersRoutes);           // perfil y admin users
router.use('/resources', resourcesRoutes);   // recursos
router.use('/favourites', favouritesRoutes); // favoritos


// EXPORTS
module.exports = router;