"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositorio_1 = require("./../../nucleo/repositorio");
const usuario_entidade_1 = require("./../entidade/usuario-entidade");
const usuario_filtro_1 = require("./../filtro/usuario-filtro");
class UsuarioRepositorio extends repositorio_1.Repositorio {
    constructor() {
        super(new usuario_entidade_1.UsuarioEntidade);
        this.filtro = new usuario_filtro_1.UsuarioFiltro;
    }
}
exports.UsuarioRepositorio = UsuarioRepositorio;
