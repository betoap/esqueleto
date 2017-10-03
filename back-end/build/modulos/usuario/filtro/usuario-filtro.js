"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filtro_1 = require("./../../nucleo/filtro");
class UsuarioFiltro extends filtro_1.Filtro {
    constructor() {
        super();
        this.restrincoes.nome = {
            presence: true,
            length: {
                minimum: 6,
                message: "deve ter pelo menos 6 caracteres"
            }
        };
        this.restrincoes.email = {
            presence: true,
            email: {
                message: "^email invalido"
            }
        };
    }
}
exports.UsuarioFiltro = UsuarioFiltro;
