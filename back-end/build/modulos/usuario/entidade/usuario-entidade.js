"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entidade_1 = require("../../nucleo/entidade");
class UsuarioEntidade extends entidade_1.Entidade {
    constructor() {
        super(...arguments);
        this.tabela = "usuarios";
        this.nome = (20);
        this.email = (20);
        /*
            public nome = {
                type: Sequelize.STRING(20)
            }
            public nome = {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        
        
            public email = {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        */
    }
}
exports.UsuarioEntidade = UsuarioEntidade;
