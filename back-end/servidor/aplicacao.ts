import { Request, Response, ErrorRequestHandler } from 'express';
import * as glob from "glob";

export class Aplicacao
{
    private glob: any;

    constructor( private app, private io, private config = null )
    {
        this.glob = glob.Glob;
        if(config.jwt.ativo) {
            let jwt = require(`../build/modulos/usuario/servico/autenticacao.js`);
            new jwt.Autenticacao(this.app, this.config).validaToken();
        }
        this.routes();
        this.modulos();
    }

    private modulos(): void
    {
        let pattern = "{./build/modulos/**/rota/index.js,./build/modulos/**/rota/rota.js,./build/modulos/**/rota/rotas.js}";
        let options = {dot:true, mark: true, ignore:["./build/modulos/nucleo/rota/rotas.js"] };
        let self = this;
        this.glob(pattern, options, function (erro, arquivos) {
            if(!erro) {
                arquivos.forEach(function (arquivo) {
                    let nome = '/' + (arquivo.split('/')[3]).toLowerCase();
                    if( nome == "/nucleo") return;
                    let modulo = require(`../${arquivo}`);
                    self.app.use(nome, modulo);
                    if( self.config.debug ) self.config.debug(nome, modulo);
                });
            };
            self.setErros();
        });
    }

    private routes(): void
    {
        this.app.route("/").get( (req: Request, res: Response, next:Function) =>
            res.status(200).json({"message": "API ESQUELETO"})
        );
    }

    private setErros(): void
    {
        this.app.use( ( req:Request, res:Response, next:Function ) => {
            res.status(404).json({
                message: "Pagina não encontrada."
            });
            next();
        });
        this.app.use( (err:ErrorRequestHandler, req:Request, res:Response, next:Function) => {
            if( process.env.NODE_ENV === "production" ) {
                res.status(500).json({
                    message: "Ocorreu um erro, nosso time esta trabalhando para corrigir!"
                });
                next(err);
            } else {
                next(err);
            }
        });
    }
}
