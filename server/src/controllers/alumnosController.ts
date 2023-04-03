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

    public async getAlumnosCurso (req: Request, res:Response) {
        // await connect.query('SELECT Nombre, Apellido1 FROM alumnos WHERE dni IN (SELECT dni_alumno FROM curso WHERE nombre = ?)', [req.body.nombre],
        // (err,rows,field) => {
        //     if(!err){
        //         if(rows.length > 0){
        //             res.json(rows);
        //         }else{
        //             res.json('No existen cursos')
        //         }
        //     }else{
        //         console.log(err);
        //     }
        // });

        await connect.query('SELECT Nombre, Apellidos FROM alumnos WHERE curso = ? AND id_Profesor IN (SELECT id FROM Profesores WHERE nombre = ?)', [req.body.nombre, req.body.profesor],
        (err,rows,field) => {
            if(!err){
                if(rows.length > 0){
                    res.json(rows);
                }else{
                    res.json('No existen cursos')
                }
            }else{
                console.log(err);
            }
        });
    }

    public async createAlumnos (req: Request, res:Response) {
        await connect.query('INSERT INTO alumnos set ?', [req.body]);
        res.json({mensaje: "alumno registrado"});
    }
}

export const alumnosController = new AlumnosController();
export default alumnosController;