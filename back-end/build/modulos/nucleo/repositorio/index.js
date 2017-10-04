"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es6_promise_1 = require("es6-promise");
const conexao_1 = require("./../../../infra/conexao");
class Repositorio {
    constructor(entidade) {
        this.entidade = entidade;
        this.db = new conexao_1.Conexao();
        const tabela = this.entidade.tabela;
        delete this.entidade.tabela;
        this.conexao = this.db.conexao.define(tabela, this.entidade, this.sequelizeConfig());
        this.sequelize = this.db.sequelize;
    }
    sequelizeConfig() {
        return {
            hooks: this.entidade.getHooks(),
            classMethods: this.entidade.getClassMethods(),
            createdAt: 'criado_em',
            updatedAt: 'editado_em',
        };
    }
    find() {
        return this.conexao.find({});
    }
    findBy(objeto) {
        return this.conexao.findBy(objeto);
    }
    findOne(objeto) {
        return this.conexao.findOne(objeto);
    }
    getAll(objeto) {
        return this.conexao.findAll(objeto);
    }
    count(objeto) {
        return this.conexao.count(objeto);
    }
    salvar(entidade, objeto) {
        let erros = this.filtro.contemErros(entidade);
        if (!erros) {
            if (objeto) {
                return this.conexao.findByAndUpdate(objeto, entidade);
            }
            else {
                return this.conexao.create(entidade);
            }
        }
        else {
            return new es6_promise_1.Promise((resolve, reject) => {
                reject(erros);
            });
        }
        ;
    }
    create(entidade) {
        return this.salvar(entidade);
    }
    update(entidade, objeto) {
        return this.salvar(entidade, objeto);
    }
    delete(objeto) {
        return this.conexao.delete(objeto);
    }
}
exports.Repositorio = Repositorio;
