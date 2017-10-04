"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const uteis_1 = require("./../../nucleo/uteis");
const rota_1 = require("./../../nucleo/rota");
const usuario_controle_1 = require("./../controle/usuario-controle");
class UsuarioRota extends rota_1.Rota {
    constructor() {
        super();
        this.controle = new usuario_controle_1.UsuarioControle();
        this.router.get("/about", uteis_1.Proxy.create(this, this.about));
        this.router.post("/login", uteis_1.Proxy.create(this, this.login));
    }
    about(req, res, next) {
        res.send("About - Usuario");
    }
    login(req, res, next) {
        let login = this
            .controle
            .login(req, res)
            .then(entidade => this.resposta(res, HttpStatus.CREATED, entidade))
            .catch(erro => this.resposta(res, HttpStatus.NOT_ACCEPTABLE, erro));
    }
}
module.exports = new UsuarioRota().rotas();
