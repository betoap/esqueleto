import { Request, Response, ErrorRequestHandler, Router, RouterOptions } from "express";

import { Rota } from "./../../nucleo/rota";
import { UsuarioControle } from "./../controle/usuario-controle";

class UsuarioRota extends Rota
{
    protected controle:UsuarioControle;

    constructor()
    {
        super();
        this.controle  = new UsuarioControle();
        this.router.get('/about', this.about);
    }

    protected about( req: Request, res: Response, next:Function ): void
    {
        res.send('About - Usuario');
    }
}

module.exports = new UsuarioRota().rotas();
