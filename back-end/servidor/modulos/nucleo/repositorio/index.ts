import { Promise } from 'es6-promise';

import { Conexao } from "./../../../infra/conexao";
import { Entidade } from "./../entidade";

export abstract class Repositorio
{
    private db: Conexao;

    protected entidade: any;
    protected filtro: any;
    protected conexao: any;
    protected sequelize: any;
    protected repositorio: any;

    constructor( entidade: Entidade )
    {
        this.entidade = entidade;
        this.db = new Conexao();
        const tabela:string = this.entidade.tabela;
        delete this.entidade.tabela;
        this.conexao = this.db.conexao.define( tabela, this.entidade, this.sequelizeConfig() );
        this.sequelize = this.db.sequelize;
    }

    private sequelizeConfig()
    {
        return {
            hooks: this.entidade.getHooks(),
            classMethods: this.entidade.getClassMethods(),
            createdAt: 'criado_em',
            updatedAt: 'editado_em',
          }
    }

    public find()
    {
        return this.conexao.find({});
    }

    public findBy( objeto: object )
    {
        return this.conexao.findBy( objeto )
    }

    public findOne( objeto: object ){
        return this.conexao.findOne( objeto );
    }

    public getAll( objeto: object )
    {
        return this.conexao.findAll( objeto );
    }

    public count( objeto: object ){
        return this.conexao.count( objeto );
    }

    public salvar(entidade: Entidade,  objeto?: object )
    {
        let erros = this.filtro.contemErros( entidade );
        if ( !erros ) {
            if ( objeto ) {
                return this.conexao.findByAndUpdate( objeto, entidade );
            } else {
                return this.conexao.create( entidade );
            }
        } else {
            return new Promise ( ( resolve, reject ) => {
                reject( erros );
            } );
        };
    }

    public create(entidade: Entidade)
    {
        return this.salvar(entidade);
    }

    public update( entidade:Entidade, objeto: object )
    {
        return this.salvar(entidade, objeto);
    }

    public delete( objeto: object )
    {
        return this.conexao.delete( objeto );
    }
}
