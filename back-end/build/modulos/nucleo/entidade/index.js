"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Entidade {
    constructor() {
        //Campos padrões do sequelize ( createdAt / updatedAt )
        this.criado_em = {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        };
        this.editado_em = {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        };
    }
}
exports.Entidade = Entidade;
