import { Filtro } from  "./../../nucleo/filtro";

export class UsuarioFiltro extends Filtro
{
    protected restrincoes: any;

    constructor ()
    {
        super();
        this.restrincoes.nome = {
            presence: true,
            length: {
                minimum: 6,
                message: "deve ter pelo menos 6 caracteres"
            }
        };
        this.restrincoes.email = {
          presence: true,
          email: {
            message: "^email invalido"
          }
      };
    }
}
