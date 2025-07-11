// IMPORTS
const express = require('express');
const router = express.Router();
const { validateInput, validateJWT, validateRole} = require("../middlewares/index")
const { login, registry, renewToken, logout } = require("../controllers/auth.controller");



// ROUTE: register
// POST http://localhost:5000/api/v1/auth/register
router.post("/register", [
    validateInput
], registry)


// ROUTE: login
// POST http://localhost:5000/api/v1/auth/login
router.post("/login", [
    validateInput
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
// // GET http://localhost:5000/api/v1/auth/private
// router.get("/private", [
//     validateJWT,
//     validateRole("Admin")
// ], login)



module.exports = router;