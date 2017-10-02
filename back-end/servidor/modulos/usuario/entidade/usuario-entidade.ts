import { Sequelize } from 'sequelize';

import { Entidade } from '../../nucleo/entidade';

export class UsuarioEntidade extends Entidade
{
    protected tabela = "usuarios";

    public nome: Sequelize.STRING(20);
    public email: Sequelize.STRING(20);

/*
    public nome = {
        type: Sequelize.STRING(20)
    }
    public nome = {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }


    public email = {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
*/

}
