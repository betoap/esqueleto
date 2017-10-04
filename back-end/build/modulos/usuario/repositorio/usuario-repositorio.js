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
    login(dados) {
        const self = this;
        return new Promise((resolve, reject) => {
            self
                .findOne({ where: { email: dados.email } })
                .then((usuario) => {
                if (usuario._modelOptions.classMethods.checaSenha(usuario, dados.senha)) {
                    delete usuario.dataValues.senha;
                    delete usuario.dataValues.salt;
                    delete usuario.dataValues.token;
                    delete usuario.dataValues.criado_em;
                    delete usuario.dataValues.editado_em;
                    resolve({ status: true, message: "Autenticado com sucesso.", usuario });
                }
                else {
                    reject({ status: false, mensagem: "Nome de usuário ou senha inválidos." });
                }
            })
                .catch((erro) => {
                reject({ status: false, mensagem: erro });
            });
        });
    }
}
exports.UsuarioRepositorio = UsuarioRepositorio;
