"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controle {
    get() {
        return this
            .repositorio
            .get();
    }
    getAll() {
        return this
            .repositorio
            .getAll();
    }
    post(req) {
        return this
            .repositorio
            .create(req.body);
    }
    put(req) {
        return this
            .repositorio
            .update(req.params.id, req.body);
    }
    delete(req) {
        return this
            .repositorio
            .delete(req.params.id);
    }
}
exports.Controle = Controle;
