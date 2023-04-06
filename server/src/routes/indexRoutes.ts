import { Router } from 'express';

import { indexController } from '../controllers/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor () {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
        this.router.post('/validarUser', indexController.validarUser);
        this.router.post('/registrarUser', indexController.create);
        this.router.post('/obtenerCursos', indexController.getCourses);
        this.router.post('/getIdProfesor', indexController.getIdProfesor);
        this.router.post('/crearCurso', indexController.crearCurso);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;