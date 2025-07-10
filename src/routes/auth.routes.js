// IMPORTS
const express = require('express');
const router = express.Router();
const { validateInput, validateJWT, validateRole} = require("../middlewares/index")
const { login, registry, renewToken } = require("../controllers/auth.controller");



// ROUTE: login
// POST http://localhost:5000/api/v1/auth/login
router.post("/login", [
    validateInput
], login)


// ROUTE: register
// POST http://localhost:5000/api/v1/auth/register
router.post("/register", [
    validateInput
], registry)


// ROUTE: renewtoken
// GET http://localhost:5000/api/v1/auth/renewtoken
router.get("/renewToken", [
    validateJWT
], renewToken)


// ROUTE: validate admin
// POST http://localhost:5000/api/v1/auth/validate-admin-role
router.get("/validate-admin-role", [
    validateJWT,
    validateRole("Admin")
], login)


module.exports = router;