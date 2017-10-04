import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';

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

    public getHooks()
    {
        const self = this;
        return {
            beforeCreate: function(usuario, options) {
                usuario.senha = self.geraSenha(usuario);
            },
            beforeUpdate: function(usuario, options) {
                usuario.senha = self.geraSenha(usuario);
            }
        }
    }

    public getClassMethods()
    {
        const self = this;
        return {
            checaSenha: ( usuario, senha ) => usuario.senha === self.geraSenha( usuario, senha )
        }
    }

    public geraSenha( usuario:UsuarioEntidade, senha?:string )
    {
        senha = senha || usuario.senha;
        return bcrypt.hashSync( senha, usuario.salt );
    }

}
