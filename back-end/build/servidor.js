"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var socketIO = require("socket.io");
var cors = require("cors");
var http = require("http");
var aplicacao_1 = require("./aplicacao");
var Servidor = /** @class */ (function () {
    function Servidor() {
        this.app = express();
        this.http = new http.Server(this.app);
        this.socketIO = socketIO(this.http);
        this.config();
        this.middlewares();
        this.start();
        new aplicacao_1.Aplicacao(this.app, this.socketIO);
    }
    Servidor.prototype.config = function () {
        this.app.disable("x-power-by");
        this.porta = process.env.PORT || 3000;
        this.app.set('porta', this.porta);
    };
    Servidor.prototype.middlewares = function () {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
    Servidor.prototype.start = function () {
        var _this = this;
        this.serv = this.http.listen(this.app.get("porta"), function () { return console.log("Servidor rodando na porta:  " + _this.serv.address().port); });
    };
    return Servidor;
}());
exports.default = new Servidor;
