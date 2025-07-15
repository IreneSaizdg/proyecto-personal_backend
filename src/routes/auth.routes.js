// IMPORTS
const express = require('express');
const router = express.Router();
const { login, registry, renewToken, logout } = require("../controllers/auth.controller");
const { validateInput, validateJWT, validateRole} = require("../middlewares/index")
const { validateAuth } = require("../middlewares/validators");


// ROUTE: register
// POST http://localhost:5000/api/v1/auth/register
router.post("/register", [
    ...validateAuth, validateInput
], registry)


// ROUTE: login
// POST http://localhost:5000/api/v1/auth/login
router.post("/login", [
    ...validateAuth, validateInput
], login)


// ROUTE: renewtoken
// GET http://localhost:5000/api/v1/auth/renewtoken
router.get("/renewToken", [
    validateJWT
], renewToken)


// ROUTE: logout
// GET http://localhost:5000/api/v1/auth/logout
router.get("/logout", logout);


// // ROUTE: validate admin role
// // GET http://localhost:5000/api/v1/auth/public
// router.get("/public", [
//     validateJWT,
//     validateRole("Admin")
// ], login)



module.exports = router;