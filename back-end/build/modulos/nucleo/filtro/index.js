"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import validate from "validate.js";
const validacao = require("validate.js");
class Filtro {
    constructor() {
        this.restrincoes = {};
    }
    contemErros(object) {
        return validacao(object, this.restrincoes);
        //return validate(object, this.restrincoes);
    }
}
exports.Filtro = Filtro;
