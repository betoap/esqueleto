import * as bcrypt from "bcrypt";

import { Repositorio } from "./../../nucleo/repositorio";
import { UsuarioEntidade } from "./../entidade/usuario-entidade";
import { UsuarioFiltro } from "./../filtro/usuario-filtro";

export class UsuarioRepositorio extends Repositorio
{
    protected filtro: UsuarioFiltro;

    constructor()
    {
        super( new UsuarioEntidade );
        this.filtro = new UsuarioFiltro;
    }

    public login( dados:any ): any
    {
        const self = this;
        return new Promise (
            ( resolve, reject ) => {
                self
                    .findOne( { where: { email: dados.email } } )
                    .then(
                        ( usuario ) => {
                            if ( usuario._modelOptions.classMethods.checaSenha( usuario, dados.senha ) ) {
                                delete usuario.dataValues.senha;
                                delete usuario.dataValues.salt;
                                delete usuario.dataValues.token;
                                delete usuario.dataValues.criado_em;
                                delete usuario.dataValues.editado_em;
                                resolve( { status: true, message: "Autenticado com sucesso.", usuario } );
                            } else {
                                reject ( { status: false, mensagem: "Nome de usuário ou senha inválidos." } );
                            }
                        }
                    )
                    .catch(
                        ( erro ) => {
                            reject ( { status: false, mensagem: erro } );
                        }
                    );
            }
        );
    }
    
}