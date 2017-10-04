"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Servico {
    find() {
        return this
            .repositorio
            .getAll();
    }
    findBy(objeto) {
        return this
            .repositorio
            .getBy(objeto);
    }
    findOne(objeto) {
        return this
            .repositorio
            .getOne(objeto);
    }
    getAll(objeto) {
        return this
            .repositorio
            .getAll(objeto);
    }
    count(objeto) {
        return this
            .repositorio
            .count(objeto);
    }
    salvar(entidade) {
        return this
            .repositorio
            .create(entidade);
    }
    create(entidade) {
        return this
            .repositorio
            .create(entidade);
    }
    update(entidade, objeto) {
        return this
            .repositorio
            .update(entidade, objeto);
    }
    delete(objeto) {
        return this
            .repositorio
            .delete(objeto);
    }
}
exports.Servico = Servico;
