import * as Sequelize from 'sequelize';

export abstract class Entidade
{
    protected tabela:  string;

    public getHooks(){ return {} }
    public getClassMethods(){ return {} }

    //Campos padrões do sequelize ( createdAt / updatedAt )
    public criado_em = {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    };
    public editado_em = {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    };
}