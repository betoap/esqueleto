"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rota_1 = require("./../../nucleo/rota");
const usuario_controle_1 = require("./../controle/usuario-controle");
class UsuarioRota extends rota_1.Rota {
    constructor() {
        super();
        this.controle = new usuario_controle_1.UsuarioControle();
        this.router.get('/about', this.about);
        this.router.post("/login", this.login);
    }
    about(req, res, next) {
        res.send('About - Usuario');
    }
    login(req, res, next) {
        res.status(200).json(res["token"]);
    }
}
module.exports = new UsuarioRota().rotas();
