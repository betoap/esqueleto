import { Request, Response, ErrorRequestHandler, Router, RouterOptions } from "express";
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
const config:any = require('./../../../config/.config');

export class Autenticacao
{

    constructor( private app? ){}

    private validaToken(): void
    {
        this.app.use( ( req:Request, res:Response, next:Function ) =>
        {
            if( 
                (
                    req.originalUrl === `/${config.jwt.moduloAcesso}/${config.jwt.paginaAcesso}` || 
                    req.originalUrl === `/${config.jwt.moduloAcesso}`
                ) &&
                req.method === "POST"
            ) {
                next();
                return;
            }
            let token = req.headers[config.jwt.header];
            if ( token ) {
                try {
                    let decoded = jwt.decode(token, config.jwt.chave);
                    if ( decoded.exp  && decoded.exp <= Date.now() ) {
                        res.status( 401 ).json({
                            message: "Não autorizado: o token exprirou."
                        });
                        return;
                    }
                    req['usuarioLogado'] = decoded;
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

    public static geraToken( res: Response, payload: any ): any
    {
        moment.locale('pt-BR');
        let resposta: any = {};
        let expires: any;
        let expira: boolean = config.jwt.expira != undefined;
        if ( expira ) {
            expires = moment().add(config.jwt.expira, 'seconds');
            resposta.expira = expires;
            payload.exp = expires;
        }
        let token = jwt.encode(payload, config.jwt.chave);
        res["token"] = token;
        resposta.token = token;
        return resposta;
    }
}
