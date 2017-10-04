"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HttpStatus = require("http-status");
const uteis_1 = require("./../uteis");
class Rota {
    constructor() {
        this.router = express_1.Router();
    }
    rotas() {
        this.router.get('/:id', uteis_1.Proxy.create(this, this.get));
        this.router.get('/', uteis_1.Proxy.create(this, this.getAll));
        this.router.post('/', uteis_1.Proxy.create(this, this.post));
        this.router.put('/:id', uteis_1.Proxy.create(this, this.put));
        this.router.delete('/:id', uteis_1.Proxy.create(this, this.delete));
        return this.router;
    }
    get(req, res, next) {
        this
            .controle
            .get()
            .then(entidade => this.resposta(res, HttpStatus.CREATED, entidade))
            .catch(erro => this.resposta(res, HttpStatus.NOT_ACCEPTABLE, erro));
    }
    getAll(req, res, next) {
        this
            .controle
            .getAll()
            .then(entidade => this.resposta(res, HttpStatus.CREATED, entidade))
            .catch(erro => this.resposta(res, HttpStatus.NOT_ACCEPTABLE, erro));
    }
    post(req, res, next) {
        this
            .controle
            .post(req)
            .then(entidade => this.resposta(res, HttpStatus.OK, entidade))
            .catch(erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro));
    }
    put(req, res, next) {
        this
            .controle
            .update(req)
            .then(entidade => this.resposta(res, HttpStatus.OK, entidade))
            .catch(erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro));
    }
    delete(req, res, next) {
        this
            .controle
            .delete(req)
            .then(entidade => this.resposta(res, HttpStatus.OK, entidade))
            .catch(erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro));
    }
    resposta(res, status, dados) {
        if (status >= 200 && status < 300)
            dados.token = res["token"];
        return res.status(status).json(dados);
    }
}
exports.Rota = Rota;
