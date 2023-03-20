"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnosController_1 = require("../controllers/alumnosController");
class AlumnosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', alumnosController_1.alumnosController.index);
        this.router.get('/listar', alumnosController_1.alumnosController.listar);
    }
}
const alumnosRoutes = new AlumnosRoutes();
exports.default = alumnosRoutes.router;
