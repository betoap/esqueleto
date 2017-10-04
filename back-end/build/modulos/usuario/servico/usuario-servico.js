"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autenticacao_1 = require("./autenticacao");
const servico_1 = require("./../../nucleo/servico");
const usuario_repositorio_1 = require("../repositorio/usuario-repositorio");
class UsuarioServico extends servico_1.Servico {
    constructor() {
        super(...arguments);
        this.repositorio = new usuario_repositorio_1.UsuarioRepositorio;
    }
    login(dados, res) {
        return new Promise((resolve, reject) => {
            this
                .repositorio
                .login(dados)
                .then((usuario) => {
                const payload = { id: usuario.usuario };
                autenticacao_1.Autenticacao.geraToken(res, payload);
                resolve(usuario);
            })
                .catch((erro) => reject(erro));
        });
    }
}
exports.UsuarioServico = UsuarioServico;
