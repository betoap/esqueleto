import * as bcrypt from "bcrypt";

import { Repositorio } from "./../../nucleo/repositorio";
import { UsuarioEntidade } from "./../entidade/usuario-entidade";
import { UsuarioFiltro } from "./../filtro/usuario-filtro";

export class UsuarioRepositorio extends Repositorio
{
    protected filtro: UsuarioFiltro;

    constructor()
    {
        super( new UsuarioEntidade );
        this.filtro = new UsuarioFiltro;
    }
    
}
