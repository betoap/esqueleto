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
        this.conexao = this.db.conexao.define(tabela, this.entidade);
        this.sequelize = this.db.sequelize;
    }
    find() {
        return this.conexao.find({});
    }
    findBy(id) {
        return this.conexao.findById(id);
    }
    findOne() {
        return this.conexao.findAll({
            limit: 1
        });
    }
    getAll() {
        return this.conexao.findAll({
            offset: 1,
            limit: 2
        });
    }
    count() {
        return this.conexao.count();
    }
    salvar(entidade, updateID = null) {
        let erros = this.filtro.contemErros(entidade);
        if (!erros) {
            if (updateID) {
                return this.conexao.findByIdAndUpdate(updateID, entidade);
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
    update(id, entidade) {
        return this.salvar(entidade, id);
    }
    delete(id) {
        return this.conexao.delete(id);
    }
}
exports.Repositorio = Repositorio;
