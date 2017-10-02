import { Filtro } from  "./../../nucleo/filtro";

export class UsuarioFiltro extends Filtro
{
    protected restrincoes: any;

    constructor ()
    {
        super();
        this.restrincoes.nome = {
            presence: true
        };
        this.restrincoes.email = {
          presence: true,
          email: true,
          message: "^You need to be atleast 18 years old"
      };
    }
}
