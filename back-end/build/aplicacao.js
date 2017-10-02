"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const jwt = require("jwt-simple");
const moment = require("moment");
class Aplicacao {
    constructor(app, io, config = null) {
        this.app = app;
        this.io = io;
        this.config = config;
        this.glob = glob.Glob;
        //if(config.jwt.ativo) this.validaToken();
        this.routes();
        this.modulos();
    }
    modulos() {
        let pattern = "{./build/modulos/**/rota/index.js,./build/modulos/**/rota/rota.js,./build/modulos/**/rota/rotas.js}";
        let options = { dot: true, mark: true, ignore: ["./build/modulos/nucleo/rota/rotas.js"] };
        let self = this;
        this.glob(pattern, options, function (erro, arquivos) {
            if (!erro) {
                arquivos.forEach(function (arquivo) {
                    let nome = '/' + (arquivo.split('/')[3]).toLowerCase();
                    if (nome == "/nucleo")
                        return;
                    let modulo = require(`../${arquivo}`);
                    self.app.use(nome, modulo);
                    if (self.config.debug)
                        self.config.debug(nome, modulo);
                });
            }
            ;
            self.setErros();
        });
    }
    validaToken() {
        this.app.use(`/${this.config.jwt.paginaAcesso}`, (req, res, next) => {
            if (req.method === "POST") {
                let token = this.geraToken(res);
                res["token"] = token;
            }
            next();
        });
        this.app.use((req, res, next) => {
            if (req.originalUrl === `/${this.config.jwt.paginaAcesso}`) {
                next();
                return;
            }
            let token = req.headers[this.config.jwt.header];
            if (token) {
                try {
                    var decoded = jwt.decode(token, this.config.jwt.chave);
                    if (decoded.exp && decoded.exp <= Date.now()) {
                        res.status(401).json({
                            message: "Não autorizado: o token exprirou."
                        });
                        return;
                    }
                    next();
                    return;
                }
                catch (err) {
                    res.status(401).json({
                        message: "Não autorizado: token inválido"
                    });
                    return;
                }
            }
            res.status(401).json({
                message: "Não autorizado: token não encontrado no HEADER"
            });
        });
    }
    geraToken(res) {
        let expires = moment().add(this.config.jwt.expira, 'seconds');
        let config = this.config.jwt.expira ? { exp: expires } : {};
        let token = jwt.encode(config, this.config.jwt.chave);
        res["token"] = token;
        res["expires"] = expires;
        return {
            token: token,
            expires: expires
        };
    }
    routes() {
        this.app.route("/").get((req, res, next) => res.status(200).json({ "message": "API ESQUELETO" }));
        this.app.route("/login").get((req, res, next) => {
            let token = this.geraToken(res);
            res.status(200).json(token);
        });
        this.app.route("/login").post((req, res, next) => {
            res.status(200).json(res["token"]);
        });
    }
    setErros() {
        this.app.use((req, res, next) => {
            res.status(404).json({
                message: "Pagina não encontrada."
            });
            next();
        });
        this.app.use((err, req, res, next) => {
            if (process.env.NODE_ENV === "production") {
                res.status(500).json({
                    message: "Ocorreu um erro, nosso time esta trabalhando para corrigir!"
                });
                next(err);
            }
            else {
                next(err);
            }
        });
    }
}
exports.Aplicacao = Aplicacao;
