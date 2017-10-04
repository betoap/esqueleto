import { Request, Response } from "express";

import { Controle } from "./../../nucleo/controle";
import { UsuarioServico } from "./../servico/usuario-servico";

export class UsuarioControle extends Controle
{
    protected servico: UsuarioServico = new UsuarioServico;

    public login( req:Request, res:Response ): any
    {
        return this
            .servico
            .login( req.body, res );
    }
}
