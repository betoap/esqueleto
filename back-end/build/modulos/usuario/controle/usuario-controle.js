"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controle_1 = require("./../../nucleo/controle");
const usuario_repositorio_1 = require("./../repositorio/usuario-repositorio");
class UsuarioControle extends controle_1.Controle {
    constructor() {
        super(...arguments);
        this.repositorio = new usuario_repositorio_1.UsuarioRepositorio;
    }
}
exports.UsuarioControle = UsuarioControle;
