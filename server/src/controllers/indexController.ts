import { json, Request, Response } from 'express';
import connect from '../database';

import jwt from 'jsonwebtoken';

class IndexController {

    index (req: Request , res: Response) {
        res.send('Hello');
    }

    public validarUser (req: Request, res: Response) {

        console.log(req.body);
        const {correo, clave} = req.body;
        console.log(correo+' y '+clave);

        connect.query('SELECT * FROM profesores WHERE Nombre = ? AND Clave = ?', 
        [correo, clave],
        (err,rows,field) => {
            if(!err){
                if(rows.length > 0){
                    let clave = rows;
                    res.json(clave[0].Clave);
                }else{
                    res.json('Usuario o claves incorrectos')
                }
            }else{
                console.log(err);
            }
        }
        );
    }

    public async create (req:Request, res: Response) {
        await connect.query('INSERT INTO profesores set ?', [req.body]);
        res.json({mensaje: "usuario registrado"});
    }

    public async getCourses (req:Request, res:Response) {
        // await connect.query('SELECT DISTINCT Nombre FROM curso WHERE ID_Profesor IN (SELECT id FROM Profesores WHERE Nombre = ? )', 
        // [req.body.usuario],
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
        // }
        // );

        await connect.query('SELECT DISTINCT Nombre FROM cursos WHERE ID_Profesor IN (SELECT id FROM profesores WHERE Nombre = ? )', 
        [req.body.usuario],
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
        }
        );
    }

    public async getIdProfesor(req:Request, res:Response) {
        await connect.query('SELECT id FROM profesores WHERE Nombre = ?', [req.body.nombre],
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ningun usuario con ese nombre');
                }
            }else{
                console.log(err);
            }
        })
    }

    public async crearCurso(req:Request, res:Response) {
        await connect.query('INSERT INTO cursos set ?', [req.body]);
        res.json({mensaje: "curso añadido correctamente"});
    }

    public async createSubject(req:Request, res:Response){
        await connect.query('INSERT INTO asignaturas set ?', [req.body]);
        res.json({mensaje: "asignatura añadida correctamente"});
    }

    public async getSubjects(req:Request, res:Response){
        await connect.query('SELECT * FROM asignaturas WHERE id_Profesor = ? AND Nombre_curso = ?', [req.body.id_Profesor, req.body.Nombre_curso],
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ningun usuario con ese nombre');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async getStudentsSubject(req:Request, res:Response){
        console.log(req.body);
        await connect.query('SELECT Nombre_alumnos FROM asignaturas WHERE id=?',[req.body.id], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna asignatura con ese id');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async writeTableCalifications(req:Request, res:Response){
        const alumnos = req.body.Nombre_alumnos.split(',')
        // await connect.query('INSERT INTO asignaturas VALUES (? , ?)',[req.body]);
        res.json({mensaje: alumnos});
    }

    public async saveThatRubrica(req:Request, res:Response){
        await connect.query('INSERT INTO calificaciones SET ?', [req.body]);
        if(res){
            res.json({mensaje: "rubrica añadida correctamente"});
        }
    }

    public async getRubricasCalifications(req:Request, res:Response){
        await connect.query('SELECT Nombre, Tabla FROM calificaciones WHERE Curso=? AND id_Profesor=? AND Asignatura=?',[req.body.Curso, req.body.id_Profesor, req.body.Asignatura], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna rubrica para este curso por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async getOnlyOneRubrica(req:Request, res:Response){
        await connect.query('SELECT Tabla FROM calificaciones WHERE Curso=? AND id_Profesor=? AND Asignatura=? AND Nombre=?',[req.body.Curso, req.body.id_Profesor, req.body.Asignatura, req.body.Nombre], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna rubrica por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async createNota(req:Request, res:Response){
        await connect.query('INSERT INTO notas SET ?', [req.body]);
        if(res){
            res.json({mensaje: "nota añadida correctamente"});
        }
    }

    public async searchNotas(req:Request, res:Response){
        await connect.query('SELECT Nota FROM notas WHERE Curso=? AND id_Profesor=? AND Asignatura=? AND Nombre_Calificacion=? AND Nombre_Alumnos',[req.body.Curso, req.body.id_Profesor, req.body.Asignatura, req.body.Nombre_Calificacion, req.body.NombreAlumnos], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna rubrica por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async updateNotas(req:Request, res:Response){
        await connect.query('UPDATE notas SET Nota=? WHERE Nombre_Alumnos=? AND Nombre_Calificacion=? AND Asignatura=? AND id_Profesor=? AND Curso=?', [req.body.Nota, req.body.Nombre_Alumnos, req.body.Nombre_Calificacion, req.body.Asignatura, req.body.id_Profesor, req.body.Curso]);
        if(res){
            res.json({mensaje: "nota actualizada correctamente"});
        }
    }

    public async getNotas(req:Request, res:Response){
        await connect.query('SELECT Nota, Nombre_Calificacion, Nombre_Alumnos FROM notas WHERE Curso=? AND id_Profesor=? AND Asignatura=?',[req.body.Curso, req.body.id_Profesor, req.body.Asignatura], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna nota por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async getRurbicasNotas(req:Request, res:Response){
        await connect.query('SELECT Nombre_Calificacion FROM notas WHERE Nombre_Calificacion=? AND Curso=?',[req.body.Nombre_Calificacion, req.body.Curso],
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna rubrica por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }

    public async getRubricas(req:Request, res:Response){
        await connect.query('SELECT Nombre, Tabla FROM calificaciones WHERE id_Profesor=?',[req.body.id_Profesor], 
        (err, rows, field) => {
            if(!err){
                if(rows.length > 0) {
                    res.json(rows);
                }else{
                    res.json('No existe ninguna rubrica por el momento');
                }
            }else{
                console.log(err);
            }
        });
    }
}

export const indexController = new IndexController();