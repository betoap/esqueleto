import {Promise} from 'es6-promise';

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
            createdAt: 'criado_em',
            updatedAt: 'editado_em',
          }
    }

    public find()
    {
        return this.conexao.find({});
    }
    public findBy(id:number)
    {
        return this.conexao.findById(id)
    }
    public findOne(){
        return this.conexao.findAll({
            limit: 1
        })
    }
    public getAll()
    {
        return this.conexao.findAll({
            //offset: 1,
            //limit: 2
        });
    }

    public count(){
        return this.conexao.count();
    }

    public salvar(entidade: Entidade, updateID: number = null)
    {
        let erros = this.filtro.contemErros( entidade );
        if ( !erros ) {
            if ( updateID ) {
                return this.conexao.findByIdAndUpdate(updateID, entidade);
            } else {
                return this.conexao.create(entidade);
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

    public update(id:number, entidade:Entidade)
    {
        return this.salvar(entidade, id);
    }

    public delete(id:number)
    {
        return this.conexao.delete(id);
    }
}
