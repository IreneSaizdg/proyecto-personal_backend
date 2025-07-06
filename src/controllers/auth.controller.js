
const register = (req, res) => {
    // lógica para registrar usuario
    res.send('Registro OK');
}

const login = (req, res) => {
    // lógica para login
    res.send('Login OK');
}


module.exports = {
    register,
    login
}