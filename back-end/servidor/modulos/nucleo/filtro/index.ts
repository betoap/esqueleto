//import * as validacao from "validate.js";
const validacao = require("validate.js");

export abstract class Filtro
{
    protected restrincoes: any;

    constructor()
    {
        this.restrincoes = {};
    }

    public contemErros(object: any): any
    {
        return validacao(object, this.restrincoes);
    }
}
