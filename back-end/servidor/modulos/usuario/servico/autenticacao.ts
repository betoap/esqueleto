import { Request, Response, ErrorRequestHandler, Router, RouterOptions } from "express";
import * as jwt from 'jwt-simple';
import * as moment from 'moment';

export class Autenticacao
{
    constructor( private app, private config ){}

    private validaToken(): void
    {
        this.app.use( `/${this.config.jwt.moduloAcesso}/${this.config.jwt.paginaAcesso}`, ( req:Request, res:Response, next:Function ) => {
            if ( req.method === "POST" ) {
                let token = this.geraToken( res );
                res["token"] = token;
            }
            next();
        });

        this.app.use( ( req:Request, res:Response, next:Function ) =>
        {
            if( req.originalUrl === `/${this.config.jwt.moduloAcesso}/${this.config.jwt.paginaAcesso}` ) {
                next();
                return;
            }
            let token = req.headers[this.config.jwt.header];
            if ( token ) {
                try {
                    var decoded = jwt.decode(token, this.config.jwt.chave);
                    if ( decoded.exp  && decoded.exp <= Date.now() ) {
                        res.status( 401 ).json({
                            message: "Não autorizado: o token exprirou."
                        });
                        return;
                    }
                    next();
                    return;
                } catch ( err ) {
                    res.status( 401 ).json({
                        message: "Não autorizado: token inválido"
                    });
                    return;
                }
            }
            res.status( 401 ).json({
                message: "Não autorizado: token não encontrado no HEADER"
            });
        });
    }

    private geraToken( res: Response ): any
    {
        let expires = moment().add(this.config.jwt.expira, 'seconds');
        let config = this.config.jwt.expira ? { exp: expires } : {};
        let token = jwt.encode(config, this.config.jwt.chave);
        res["token"] = token;
        res["expires"] = expires;
        return {
            token : token,
            expires: expires
        };
    }
}
