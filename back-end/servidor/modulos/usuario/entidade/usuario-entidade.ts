import * as Sequelize from 'sequelize';
import * as bcrypt from "bcrypt";

import { Entidade } from '../../nucleo/entidade';

export class UsuarioEntidade extends Entidade
{
    protected tabela = "usuarios";

    public id:any = {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

    public nome:any = {
          type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
              notEmpty: true
          }
    }

    public email:any = {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

    public senha:any = {
        type: Sequelize.STRING(20),
        allowNull: false,
        set: (key: string | object, value: any, options: Object) => {
            console.log(key, value, options);
            //this.senha.Model.usuarios.setDataValue('senha', 'TESTE!@#');
            this.geraSenha(key);
        },
        validate: {
            notEmpty: true
        }
    }
    
    public salt:any = {
        type: Sequelize.STRING(254),
        allowNull: false,
        set: function(val) {
            this.setDataValue('salt', bcrypt.genSaltSync( Math.random() * 10 ));
        },
        defaultValue: bcrypt.genSaltSync(10)
    }
    
    public token:any = {
        type: Sequelize.STRING(254),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

    public geraSenha( senha: string | object )
    {
        console.log("GERA: ", senha, this.salt);
        return bcrypt.hashSync(senha, this.salt);
    }

}
