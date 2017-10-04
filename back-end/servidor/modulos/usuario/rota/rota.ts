import { Request, Response, ErrorRequestHandler, Router, RouterOptions } from "express";
import * as HttpStatus from "http-status";

import { Proxy } from "./../../nucleo/uteis";
import { Rota } from "./../../nucleo/rota";
import { UsuarioControle } from "./../controle/usuario-controle";

class UsuarioRota extends Rota
{
    protected controle:UsuarioControle;

    constructor()
    {
        super();
        this.controle  = new UsuarioControle();
        this.router.get( "/about", Proxy.create( this, this.about ) );
        this.router.post( "/login", Proxy.create( this, this.login ) );
    }

    protected about( req: Request, res: Response, next:Function ): void
    {
        res.send( "About - Usuario" );
    }
    
    protected login( req: Request, res: Response, next:Function ): void
    {
        let login = this
            .controle
            .login( req, res )
            .then( entidade => this.resposta( res, HttpStatus.CREATED, entidade ) ) 
            .catch( erro => this.resposta( res, HttpStatus.NOT_ACCEPTABLE, erro ) );
    }
}

module.exports = new UsuarioRota().rotas();
