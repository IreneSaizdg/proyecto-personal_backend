// IMPORTS
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model");
const { generateJWT } = require("../utils/JWTgenerate")



// FUNCION login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //1. Buscar al usuario por email
        const user = await userModel.findByEmail(email);

        //2. Si no existe el usuario
        if (!user) {
            return res.status(404).json({
                error: "Usuario o contraseña incorrecta"
            });
        }

        //3. Si sí existe comparar contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: "Usuario o contraseña incorrecta"
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
            token, // sigue enviando el token
            user: {
                id: user.user_id,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({
            error: "Errores interno del servidor"
        });
    }
};

// FUNCION: Registro
const registry = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ //409 CONFLICT, la solicitud no puede ser completada porque entra en conflicto con el estado actual del recurso de destino.
                error: "El usuario ya existe"
            });
        }

        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.insertUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        //4. Si todo coincide generar token JWT
        const token = await generateJWT({
            uid: newUser.user_id,
            email: newUser.email,
            role: newUser.role
        });

        // Enviar token y datos del usuario
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
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};



// FUNCION: renovar token
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

// FUNCION: validar role
const validateRole = async (req, res) => { }


// EXPORTS
module.exports = {
    login,
    registry,
    renewToken,
    validateRole
}