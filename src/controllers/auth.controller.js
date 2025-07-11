// IMPORTS
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model");
const { generateJWT } = require("../utils/JWTgenerate");



// CONTROLLER: 1. Registro API
const registry = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ //409 CONFLICT, la solicitud no puede ser completada porque entra en conflicto con el estado actual del recurso de destino.
                error: "El usuario ya existe"
            });
        }

        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        //Si todo coincide generar token JWT
        const token = await generateJWT({
            uid: newUser.user_id,
            email: newUser.email,
            role: newUser.role
        });

        // Enviar res. JSON con token y datos del usuario
        res.status(201).json({
            message: "Usuario registrado con éxito",
            token,
            user: {
                id: newUser.user_id,
                role: newUser.role,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ error: "Error interno del servidor"});
    }
};



// CONTROLLER: 2. Login API
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        //0. Validar que se envíe el email y password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password son obligatorios.' });
        }

        //1. Buscar al usuario por email
        const user = await userModel.getUserByEmail(email);

        //2. Si no existe el usuario
        if (!user) {
            return res.status(401).json({
                error: "Usuario no encontrado"
            });
        }

        console.log("📥 password recibido:", password);
console.log("🧑‍💻 user:", user);
console.log("🔐 user.password:", user?.password);

if (!user?.password || !password) {
  return res.status(400).json({ error: "Faltan datos para comprobar la contraseña." });
}
        //3. Si sí existe comparar contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }

        //4. Si todo coincide generar token JWT
        const token = await generateJWT({
            uid: user.user_id,
            email: user.email,
            role: user.role
        });

        //5. Respuesta exitosa
        return res.status(200).json({
            message: "Login correcto",
            token,
            user: {
                id: user.user_id,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor"});
    }
};



// CONTROLLER: 3. Renovar token
const renewToken = async (req, res) => {
    generateJWT({ email: req.tokenEmail, role: req.role })
        .then(resp => {
            return res.status(202).json({
                ok: true,
                token: resp
            })
        })
        .catch(err => {
            return res.status(403).json({
                ok: false,
                msg: err
            })
        })

}



// CONTROLLER: 4. Logout API (solo responde, el frontend borra LocalStorage)
const logout = (req, res) => {
  return res.status(200).json({ message: "Logout correcto" });
};





// EXPORTS
module.exports = {
    login,
    registry,
    renewToken,
    logout
}