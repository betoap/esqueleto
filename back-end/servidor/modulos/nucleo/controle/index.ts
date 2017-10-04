import { Request } from "express";
export abstract class Controle
{
    protected servico: any;

    get()
    {
        return this
        .servico
        .get()
    }

    getAll()
    {
        return this
        .servico
        .getAll()
    }

    post(req: Request)
    {
        return this
        .servico
        .create(req.body);
    }

    put(req: Request)
    {
        return this
        .servico
        .update(req.params.id, req.body)
    }

    delete(req: Request)
    {
        return this
        .servico
        .delete(req.params.id)
    }
}
