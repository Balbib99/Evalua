import { Router } from 'express';

import { alumnosController } from '../controllers/alumnosController';

class AlumnosRoutes {

    public router: Router = Router();

    constructor () {
        this.config();
    }

    config(): void {
        this.router.get('/', alumnosController.index); 
        this.router.get('/listar', alumnosController.listar);
    }

}

const alumnosRoutes = new AlumnosRoutes();
export default alumnosRoutes.router;