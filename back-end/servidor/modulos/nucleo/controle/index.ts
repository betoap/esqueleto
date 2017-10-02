import { Request } from "express";
export abstract class Controle
{
    protected repositorio: any;

    get()
    {
        return this
        .repositorio
        .get()
    }

    getAll()
    {
        return this
        .repositorio
        .getAll()
    }

    post(req: Request)
    {
        return this
        .repositorio
        .create(req.body);
    }

    put(req: Request)
    {
        return this
        .repositorio
        .update(req.params.id, req.body)
    }

    delete(req: Request)
    {
        return this
        .repositorio
        .delete(req.params.id)
    }
}
