import { Controle } from "./../../nucleo/controle";
import { UsuarioRepositorio } from "./../repositorio/usuario-repositorio";

export class UsuarioControle extends Controle
{
    protected repositorio: UsuarioRepositorio = new UsuarioRepositorio;
}
