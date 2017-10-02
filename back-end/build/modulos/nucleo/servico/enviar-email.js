const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sgTransport = require("nodemailer-sendgrid-transport");
const email = require('./../../../config/.email');
class EnviarEmail {
    constructor(para, de, titulo, template, conteudo) {
        this.para = para;
        this.de = de;
        this.titulo = titulo;
        this.template = template;
        this.conteudo = conteudo;
        this.mailer = nodemailer.createTransport(this.credenciais());
        this.mailer.use("compile", hbs(this.options()));
    }
    set template(caminho) {
        let _caminho = caminho.split('/');
        let total = _caminho.length;
        this.nomeTemplate = _caminho.splice(total - 1, total)[0].split('.')[0];
        caminho = _caminho.join('/') + '/';
        this.caminhoTemplate = caminho;
    }
    get template() {
        return this.caminhoTemplate + this.nomeTemplate;
    }
    credenciais() {
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
        };
    }
    options() {
        return {
            viewPath: this.caminhoTemplate,
            extName: ".hbs"
        };
    }
    enviar() {
        return this.mailer.sendMail({
            from: this.de,
            to: this.para,
            subject: this.titulo,
            template: this.nomeTemplate,
            context: this.conteudo
        });
    }
}
let mail = new EnviarEmail("betoap.developer@gmail.com", "betoap.developer@gmail.com", "Email de teste", "build/modulos/usuario/email/cadastro.hbs", { variable1: 'value1', variable2: 'value2' });
mail
    .enviar()
    .then((resposta) => {
    if (resposta)
        console.log("Erro", resposta);
})
    .catch(erro => console.log(erro));
