import { Request, Response } from 'express';

import connect from '../database';

class AlumnosController {

    public index (req: Request , res: Response) {
        connect.query('DESCRIBE alumnos');
        res.json('Alumnos');

        //otro tipo de envio de respuestas
        //res.send('Alumnos');
    }

    public async listar (req: Request, res: Response) {
        await connect.query('SELECT * FROM alumnos', function(err, result){
            if (err) throw err;
            res.json(result);
        });
    }
}

export const alumnosController = new AlumnosController();
export default alumnosController;