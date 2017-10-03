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
        this.router.post("/login", this.login);
    }

    protected about( req: Request, res: Response, next:Function ): void
    {
        res.send('About - Usuario');
    }
    
    protected login( req: Request, res: Response, next:Function ): void
    {
        res.status(200).json( res["token"] );
    }
}

module.exports = new UsuarioRota().rotas();
