"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rota_1 = require("./../../nucleo/rota");
const usuario_controle_1 = require("./../controle/usuario-controle");
class UsuarioRota extends rota_1.Rota {
    constructor() {
        super();
        this.controle = new usuario_controle_1.UsuarioControle();
        this.router.get('/about', this.about);
    }
    about(req, res, next) {
        res.send('About - Usuario');
    }
}
module.exports = new UsuarioRota().rotas();
