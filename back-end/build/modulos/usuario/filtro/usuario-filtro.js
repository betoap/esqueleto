"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filtro_1 = require("./../../nucleo/filtro");
class UsuarioFiltro extends filtro_1.Filtro {
    constructor() {
        super();
        this.restrincoes.nome = {
            presence: true
        };
        this.restrincoes.email = {
            presence: true,
            email: true,
            message: "^You need to be atleast 18 years old"
        };
    }
}
exports.UsuarioFiltro = UsuarioFiltro;
