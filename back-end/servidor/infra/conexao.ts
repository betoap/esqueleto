const _Sequelize = require('sequelize');

const credenciais:any = require('./../config/.bancoDeDados');

export class Conexao
{
    private __sequelize;
    private __conexao;

    public constructor ()
    {
        const conexao = new _Sequelize(credenciais.dbnome, credenciais.usuario, credenciais.senha, {
            host: credenciais.servidor,
            dialect: credenciais.tipo,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        })
        //.sync({force: true}).done(function () {
        //     return database;
        //})
        ;
        this.__sequelize = _Sequelize;
        this.__conexao = conexao;
    }

    get conexao()
    {
        return this.__conexao;
    }
    get sequelize()
    {
        return this.__sequelize;
    }
}
