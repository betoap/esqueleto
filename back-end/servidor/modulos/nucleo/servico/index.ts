import { Entidade } from '../entidade';

export abstract class Servico
{
    protected repositorio:any;

    public find()
    {
        return this
            .repositorio
            .getAll();
    }

    public findBy( objeto: object )
    {
        return this
            .repositorio
            .getBy( objeto );
    }

    public findOne( objeto: object )
    {
        return this
        .repositorio
        .getOne( objeto );
    }
    
    public getAll( objeto: object )
    {
        return this
            .repositorio
            .getAll( objeto );
    }

    public count( objeto: object )
    {
        return this
            .repositorio
            .count( objeto );
    }

    public salvar( entidade: Entidade )
    {
        return this
            .repositorio
            .create( entidade );
    }

    public create( entidade: Entidade )
    {
        return this
            .repositorio
            .create( entidade );
    }

    public update( entidade: Entidade, objeto:object )
    {
        return this
        .repositorio
        .update( entidade, objeto );
    }

    public delete( objeto:object )
    {
        return this
            .repositorio
            .delete( objeto );
    }
}