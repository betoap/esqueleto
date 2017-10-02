import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as sequelize from "sequelize";
import * as socketIO from "socket.io";
import * as cors from "cors";
import * as http from "http";
import * as debug from "debug";

import { Proxy } from "./../modulos/nucleo/uteis";
import { Aplicacao } from "./../aplicacao";

class Servidor
{
    public static ambiente:string = process.env.NODE_ENV || 'development';

    protected app: express.Application;
    protected http:any;
    protected socketIO:any;

    private serv:any;
    private porta:number;
    private debug:any;
    private morgan: morgan.Morgan;
    private bodyParser:any;
    private sequelize:any;
    private cors:any;
    private config:any = require('./../config/.config');

    constructor()
    {
        this.app = express();
        this.http = new http.Server( this.app );
        this.socketIO = socketIO( this.http );
        this.configuracao ();
        this.middlewares();
        this.start();
        new Aplicacao(this.app, this.socketIO, this.config);
    }

    private configuracao () : void
    {
        if( this.config.debug ) {
            this.debug = debug( this.config.projeto );
            this.config.debug = this.debug;
        };
        this.app.disable("x-power-by");
        this.porta = this.config.porta;
        this.app.set('porta', this.porta);
    }

    private middlewares() : void
    {
        this.app.use( morgan( "dev" ) );
        this.app.use( cors() );
        this.app.use( bodyParser.urlencoded( { extended: true }) );
        this.app.use( bodyParser.json() );
    }

    private start() : void
    {
        this.serv = this.http.listen(
            this.app.get( "porta" ),
            () => console.log( `Servidor rodando na porta:  ${this.serv.address().port}` )
        );
        this.serv.on("error", Proxy.create(this, this.erro) );
    }


    private erro( erro ): void
    {
        if( erro.syscall !== "listen" ) {
            throw erro;
        }

        const bind = typeof this.porta === "string" ? `Via ${this.porta}` : `Porta ${this.porta}`;

        switch( erro.code ) {
            case "EACCES" :
                console.error( `${bind} requer privilégios elevados` );
                process.exit(1);
                break;
            case "EADDRINUSE" :
                console.error( `${bind} já está em uso` );
                process.exit(1);
                break;
            default:
                throw erro
        }
    }
}

export default new Servidor;
