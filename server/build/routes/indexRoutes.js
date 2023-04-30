"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.index);
        this.router.post('/validarUser', indexController_1.indexController.validarUser);
        this.router.post('/registrarUser', indexController_1.indexController.create);
        this.router.post('/obtenerCursos', indexController_1.indexController.getCourses);
        this.router.post('/getIdProfesor', indexController_1.indexController.getIdProfesor);
        this.router.post('/crearCurso', indexController_1.indexController.crearCurso);
        this.router.post('/createSubject', indexController_1.indexController.createSubject);
        this.router.post('/getSubjects', indexController_1.indexController.getSubjects);
        this.router.post('/getStudentsSubject', indexController_1.indexController.getStudentsSubject);
        this.router.post('/writeTableCalifications', indexController_1.indexController.writeTableCalifications);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
