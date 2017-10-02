"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Sequelize = require('sequelize');
const credenciais = require('./../config/.bancoDeDados');
class Conexao {
    constructor() {
        const conexao = new _Sequelize(credenciais.dbnome, credenciais.usuario, credenciais.senha, {
            host: credenciais.servidor,
            dialect: credenciais.tipo,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });
        this.__sequelize = _Sequelize;
        this.__conexao = conexao;
    }
    get conexao() {
        return this.__conexao;
    }
    get sequelize() {
        return this.__sequelize;
    }
}
exports.Conexao = Conexao;
