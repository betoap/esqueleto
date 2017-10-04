import { Request, Response, ErrorRequestHandler, Router, RouterOptions } from "express";
import * as HttpStatus from "http-status";

import { Proxy } from "./../uteis";

export abstract class Rota
{
    protected router: Router;
    protected controle: any;

    constructor()
    {
        this.router = Router();
    }

    public rotas (): Router
    {
        this.router.get('/:id', Proxy.create(this, this.get));
        this.router.get('/', Proxy.create(this, this.getAll));
        this.router.post('/', Proxy.create(this, this.post));
        this.router.put('/:id', Proxy.create(this, this.put));
        this.router.delete('/:id', Proxy.create(this, this.delete));
        return this.router;
    }

    protected get( req: Request, res: Response, next:Function ): void
    {
        this
            .controle
            .get()
            .then( entidade => this.resposta(res, HttpStatus.CREATED, entidade) )
            .catch( erro => this.resposta(res, HttpStatus.NOT_ACCEPTABLE, erro) );
    }

    protected getAll( req: Request, res: Response, next:Function ): void
    {
        this
            .controle
            .getAll()
            .then( entidade => this.resposta(res, HttpStatus.CREATED, entidade) )
            .catch( erro => this.resposta(res, HttpStatus.NOT_ACCEPTABLE, erro) );
    }

    protected post( req: Request, res: Response, next:Function ): void
    {
        this
            .controle
            .post(req)
            .then( entidade => this.resposta(res, HttpStatus.OK, entidade) )
            .catch( erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro) );
    }

    protected put( req: Request, res: Response, next:Function ): void
    {
        this
            .controle
            .update(req)
            .then( entidade => this.resposta(res, HttpStatus.OK, entidade) )
            .catch( erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro) );
    }

    protected delete( req: Request, res: Response, next:Function ): void
    {
        this
            .controle
            .delete(req)
            .then( entidade => this.resposta(res, HttpStatus.OK, entidade) )
            .catch( erro => this.resposta(res, HttpStatus.UNPROCESSABLE_ENTITY, erro) );
    }

    protected resposta(res: Response, status:any, dados:any)
    {
        if( status >= 200 && status < 300 ) dados.token = res["token"];
        return res.status(status).json(dados);
    }
}
