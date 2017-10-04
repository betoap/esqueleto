"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const moment = require("moment");
const config = require('./../../../config/.config');
class Autenticacao {
    constructor(app) {
        this.app = app;
    }
    validaToken() {
        this.app.use((req, res, next) => {
            if (req.originalUrl === `/${config.jwt.moduloAcesso}/${config.jwt.paginaAcesso}`) {
                next();
                return;
            }
            let token = req.headers[config.jwt.header];
            if (token) {
                try {
                    let decoded = jwt.decode(token, config.jwt.chave);
                    if (decoded.exp && decoded.exp <= Date.now()) {
                        res.status(401).json({
                            message: "Não autorizado: o token exprirou."
                        });
                        return;
                    }
                    req['usuarioLogado'] = decoded;
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
    static geraToken(res, payload) {
        moment.locale('pt-BR');
        let resposta = {};
        let expires;
        let expira = config.jwt.expira != undefined;
        if (expira) {
            expires = moment().add(config.jwt.expira, 'seconds');
            resposta.expira = expires;
            payload.exp = expires;
        }
        let token = jwt.encode(payload, config.jwt.chave);
        res["token"] = token;
        resposta.token = token;
        return resposta;
    }
}
exports.Autenticacao = Autenticacao;
