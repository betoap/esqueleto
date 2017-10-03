"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const entidade_1 = require("../../nucleo/entidade");
class UsuarioEntidade extends entidade_1.Entidade {
    constructor() {
        super(...arguments);
        this.tabela = "usuarios";
        this.id = {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        };
        this.nome = {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        };
        this.email = {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        };
        this.senha = {
            type: Sequelize.STRING(20),
            allowNull: false,
            set: (key, value, options) => {
                console.log(key, value, options);
                //this.senha.Model.usuarios.setDataValue('senha', 'TESTE!@#');
                this.geraSenha(key);
            },
            validate: {
                notEmpty: true
            }
        };
        this.salt = {
            type: Sequelize.STRING(254),
            allowNull: false,
            set: function (val) {
                this.setDataValue('salt', bcrypt.genSaltSync(Math.random() * 10));
            },
            defaultValue: bcrypt.genSaltSync(10)
        };
        this.token = {
            type: Sequelize.STRING(254),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        };
    }
    geraSenha(senha) {
        console.log("GERA: ", senha, this.salt);
        return bcrypt.hashSync(senha, this.salt);
    }
}
exports.UsuarioEntidade = UsuarioEntidade;
