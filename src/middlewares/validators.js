const { check } = require("express-validator");


// VALIDACIONES: AUTH (registro y login)
const validateAuth = [
  check("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe tener formato de email"),
  check("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage("Debe contener al menos una letra y un número"),
];


// VALIDACIONES: RESOURCES (crear o editar recurso)
const validateResource = [
  check("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ max: 100 }).withMessage("Máximo 100 caracteres"),
  check("url")
    .notEmpty().withMessage("La URL es obligatoria")
    .isURL().withMessage("Debe ser una URL válida"),
  check("description")
    .optional()
    .isLength({ max: 300 }).withMessage("Máximo 300 caracteres en la descripción"),
  check("tag")
    .notEmpty().withMessage("El tag es obligatorio")
    .isLength({ max: 50 }).withMessage("Máximo 50 caracteres en el tag"),
  check("public")
    .isBoolean().withMessage("El campo 'public' debe ser true o false"),
];


// VALIDACIONES: USER (crear o editar usuario)
const validateUser = [
  check("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 }).withMessage("Debe tener al menos 3 caracteres"),

  check("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe tener formato de email"),

  check("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage("Debe tener al menos una mayúscula, una minúscula y un número"),

  check("role")
    .optional()
    .isIn(["User", "Admin"]).withMessage("El rol debe ser 'User' o 'Admin'"),
];



module.exports = {
  validateAuth,
  validateResource,
  validateUser
};