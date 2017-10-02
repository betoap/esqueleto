const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sgTransport = require("nodemailer-sendgrid-transport");
const email = require('./../../../config/.email');

class EnviarEmail
{
     private mailer;

     public titulo:string;
     public caminhoTemplate:string;
     public nomeTemplate:string;
     public conteudo:any;
     public de:string;
     public para:string;

     constructor (para?:string, de?:string, titulo?:string, template?:string, conteudo?:any )
     {
         this.para = para;
         this.de = de;
         this.titulo = titulo;
         this.template = template;
         this.conteudo = conteudo;
         this.mailer = nodemailer.createTransport( this.credenciais() );
         this.mailer.use( "compile", hbs( this.options() ) );
     }

     public set template( caminho: string )
     {
         let _caminho = caminho.split('/');
         let total = _caminho.length;
         this.nomeTemplate = _caminho.splice(total-1, total)[0].split('.')[0];
         caminho = _caminho.join('/') + '/';
         this.caminhoTemplate = caminho;
     }

     public get template( ): string
     {
         return this.caminhoTemplate + this.nomeTemplate;
     }

     public credenciais ()
     {
         return {
             service: email.service,
             transportMethod: email.metodo,
             host: email.host,
             port: email.porta,
             secure: email.seguranca,
             logger: email.log,
             debug: email.debug,
             auth: {
                 user: email.usuario,
                 pass: email.senha
             }
         }
     }

     private options ()
     {
         return {
             viewPath: this.caminhoTemplate,
             extName: ".hbs"
         }
     }

     public enviar()
     {
         return this.mailer.sendMail({
             from: this.de,
             to: this.para,
             subject: this.titulo,
             template: this.nomeTemplate,
             context: this.conteudo
         });
     }
}

let mail = new EnviarEmail(
    "betoap.developer@gmail.com",
    "betoap.developer@gmail.com",
    "Email de teste",
    "build/modulos/usuario/email/cadastro.hbs",
    {variable1 : 'value1',variable2 : 'value2'}
);
mail
    .enviar()
    .then( (resposta) => {
        if(resposta)
            console.log("Erro", resposta);
    })
    .catch( erro => console.log(erro) )
