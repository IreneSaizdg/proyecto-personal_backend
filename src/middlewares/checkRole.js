// MIDDLEWARE PROVISIONAL
function checkRole(role) {
  return (req, res, next) => {
    next();
  //   // Suponiendo que en req.user tienes el usuario autenticado y su rol
  //   if (req.user && req.user.role === role) {
  //     next();
  //   } else {
  //     res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
  //   }
  };
}



module.exports = { checkRole };