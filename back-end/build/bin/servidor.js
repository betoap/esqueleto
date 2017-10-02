"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const cors = require("cors");
const http = require("http");
const debug = require("debug");
const uteis_1 = require("./../modulos/nucleo/uteis");
const aplicacao_1 = require("./../aplicacao");
class Servidor {
    constructor() {
        this.config = require('./../config/.config');
        this.app = express();
        this.http = new http.Server(this.app);
        this.socketIO = socketIO(this.http);
        this.configuracao();
        this.middlewares();
        this.start();
        new aplicacao_1.Aplicacao(this.app, this.socketIO, this.config);
    }
    configuracao() {
        if (this.config.debug) {
            this.debug = debug(this.config.projeto);
            this.config.debug = this.debug;
        }
        ;
        this.app.disable("x-power-by");
        this.porta = this.config.porta;
        this.app.set('porta', this.porta);
    }
    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    start() {
        this.serv = this.http.listen(this.app.get("porta"), () => console.log(`Servidor rodando na porta:  ${this.serv.address().port}`));
        this.serv.on("error", uteis_1.Proxy.create(this, this.erro));
    }
    erro(erro) {
        if (erro.syscall !== "listen") {
            throw erro;
        }
        const bind = typeof this.porta === "string" ? `Via ${this.porta}` : `Porta ${this.porta}`;
        switch (erro.code) {
            case "EACCES":
                console.error(`${bind} requer privilégios elevados`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} já está em uso`);
                process.exit(1);
                break;
            default:
                throw erro;
        }
    }
}
Servidor.ambiente = process.env.NODE_ENV || 'development';
exports.default = new Servidor;
