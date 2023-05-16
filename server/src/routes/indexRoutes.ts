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
        this.router.post('/createSubject', indexController.createSubject);
        this.router.post('/getSubjects', indexController.getSubjects);
        this.router.post('/getStudentsSubject', indexController.getStudentsSubject);
        this.router.post('/writeTableCalifications', indexController.writeTableCalifications);
        this.router.post('/saveThatRubrica', indexController.saveThatRubrica);
        this.router.post('/getRubricasCalifications', indexController.getRubricasCalifications);
        this.router.post('/getOnlyOneRubrica', indexController.getOnlyOneRubrica);
        this.router.post('/createNota', indexController.createNota);
        this.router.post('/searchNotas', indexController.searchNotas);
        this.router.post('/getNotas', indexController.getNotas);
        this.router.post('/updateNotas', indexController.updateNotas);
        this.router.post('/getRurbicasNotas', indexController.getRurbicasNotas);
        this.router.post('/getRubricas', indexController.getRubricas);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;