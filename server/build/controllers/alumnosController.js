"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alumnosController = void 0;
const database_1 = __importDefault(require("../database"));
class AlumnosController {
    index(req, res) {
        database_1.default.query('DESCRIBE alumnos');
        res.json('Alumnos');
        //otro tipo de envio de respuestas
        //res.send('Alumnos');
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM alumnos WHERE id_Profesor=?', [req.body.id_Profesor], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existen alumnos');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getAlumnosCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield database_1.default.query('SELECT Nombre, Apellidos, id FROM alumnos WHERE curso = ? AND id_Profesor IN (SELECT id FROM profesores WHERE nombre = ?)', [req.body.nombre, req.body.profesor], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existen cursos');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    createAlumnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO alumnos set ?', [req.body]);
            res.json({ mensaje: "alumno registrado" });
        });
    }
    getAlumnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM alumnos WHERE id=?', [req.body.id], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existen alumnos');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE alumnos SET ? WHERE id=?', [req.body, req.body.id]);
            res.json({ mensaje: "alumno actualizado" });
        });
    }
}
exports.alumnosController = new AlumnosController();
exports.default = exports.alumnosController;
