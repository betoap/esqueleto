"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validacao = require("validate.js");
class Filtro {
    constructor() {
        this.restrincoes = {};
    }
    contemErros(object) {
        return validacao(object, this.restrincoes);
    }
}
exports.Filtro = Filtro;
