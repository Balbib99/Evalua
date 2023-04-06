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

        await connect.query('SELECT DISTINCT Nombre FROM cursos WHERE ID_Profesor IN (SELECT id FROM Profesores WHERE Nombre = ? )', 
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
}

export const indexController = new IndexController();