"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controle {
    get() {
        return this
            .servico
            .get();
    }
    getAll() {
        return this
            .servico
            .getAll();
    }
    post(req) {
        return this
            .servico
            .create(req.body);
    }
    put(req) {
        return this
            .servico
            .update(req.params.id, req.body);
    }
    delete(req) {
        return this
            .servico
            .delete(req.params.id);
    }
}
exports.Controle = Controle;
