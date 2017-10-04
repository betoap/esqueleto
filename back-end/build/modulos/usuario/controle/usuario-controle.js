"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controle_1 = require("./../../nucleo/controle");
const usuario_servico_1 = require("./../servico/usuario-servico");
class UsuarioControle extends controle_1.Controle {
    constructor() {
        super(...arguments);
        this.servico = new usuario_servico_1.UsuarioServico;
    }
    login(req, res) {
        return this
            .servico
            .login(req.body, res);
    }
}
exports.UsuarioControle = UsuarioControle;
