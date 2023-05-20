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
        this.router.post('/listar', alumnosController_1.alumnosController.listar);
        this.router.post('/alumnos-curso', alumnosController_1.alumnosController.getAlumnosCurso);
        this.router.post('/crearAlumnos', alumnosController_1.alumnosController.createAlumnos);
        this.router.post('/getAlumnos', alumnosController_1.alumnosController.getAlumnos);
        this.router.post('/updateStudent', alumnosController_1.alumnosController.updateStudent);
    }
}
const alumnosRoutes = new AlumnosRoutes();
exports.default = alumnosRoutes.router;
