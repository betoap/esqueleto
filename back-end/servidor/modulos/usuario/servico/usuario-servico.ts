import { Autenticacao } from './autenticacao';
import { Servico } from "./../../nucleo/servico";
import { UsuarioRepositorio } from '../repositorio/usuario-repositorio';

export class UsuarioServico extends Servico
{
    protected repositorio:UsuarioRepositorio = new UsuarioRepositorio;

    public login( dados, res )
    {
        return new Promise (
            ( resolve, reject ) => {
                this
                    .repositorio
                    .login( dados )
                    .then( ( usuario ) => {
                        const payload = { id: usuario.usuario };
                        Autenticacao.geraToken( res, payload );
                        resolve( usuario )
                    })
                    .catch( ( erro ) => reject ( erro ) );
            }
        )
    }
}