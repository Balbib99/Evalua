import { json, Request, Response } from 'express';
import connect from '../database';

class IndexController {

    index (req: Request , res: Response) {
        res.send('Hello');
    }

    public async validarUsuario (req: Request, res: Response) {
        let query ='SELECT Nombre FROM profesores';
        await connect.query(query, function(err, result){
            if (err) throw err;
            res.json(result);
        });
    }
}

export const indexController = new IndexController();